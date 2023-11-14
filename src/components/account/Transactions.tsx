import { parseISO, format } from 'date-fns'
import Link from 'next/link'

import withSusepnse from '@hooks/withSuspense'

import useTransactions from './hooks/useTransactions'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'
import addDelimiter from '@/utils/addDelimiter'

function Transactions() {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)

  return (
    <div>
      <Text bold={true} style={{ padding: 24 }}>
        입출금내역
      </Text>

      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <Text>아직 입출금 내역이 없어요</Text>
        </Flex>
      ) : (
        <ul>
          {transactions?.map((transaction) => {
            const 입금인가 = transaction.type === 'deposit'

            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={입금인가 ? 'blue' : 'red'} bold={true}>
                      {입금인가 ? '+' : '-'} {addDelimiter(transaction.amount)}
                      원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      )}
      <Link href="/account/transactions">
        <Button full={true} size="medium" weak={true}>
          자세히보기
        </Button>
      </Link>
    </div>
  )
}

export default withSusepnse(Transactions, {
  fallback: <div>로딩중입니다...</div>,
})
