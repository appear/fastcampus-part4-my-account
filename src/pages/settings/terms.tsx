import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import {
  QueryClient,
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { useMemo } from 'react'

import { getTerms } from '@remote/account'
import { User } from '@models/user'
import useUser from '@/hooks/useUser'
import { 약관목록 } from '@constants/account'
import Top from '@shared/Top'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'
import { updateTerms } from '@remote/account'

function TermsPage() {
  const user = useUser()
  const client = useQueryClient()

  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )

  const { mutate, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {
        // TODO
      },
    },
  )

  const 동의한약관목록 = useMemo(() => {
    if (data == null) {
      return null
    }

    const 동의전체약관목록 = 약관목록.filter(({ id }) =>
      data.termIds.includes(id),
    )

    const 필수약관목록 = 동의전체약관목록.filter(
      ({ mandatory }) => mandatory === true,
    )
    const 선택약관목록 = 동의전체약관목록.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { 필수약관목록, 선택약관목록 }
  }, [data])

  const handleDisagree = (selectedTermId: string) => {
    const updatedTermIds = data?.termIds.filter(
      (termId) => selectedTermId !== termId,
    )

    if (updatedTermIds != null) {
      mutate(updatedTermIds)
    }
  }

  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />

      {동의한약관목록 == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {동의한약관목록.필수약관목록.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {동의한약관목록.선택약관목록.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={
                <Button
                  onClick={() => handleDisagree(term.id)}
                  disabled={isLoading === true}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default TermsPage
