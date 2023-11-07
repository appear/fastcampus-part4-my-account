import { useRouter } from 'next/router'
import { useRef, useEffect, useState, useCallback, ChangeEvent } from 'react'
import { useQuery } from 'react-query'

import Input from '@shared/Input'
import Top from '@shared/Top'
import { getSearchCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Badge from '@shared/Badge'
import useDebounce from '@/hooks/useDebounce'

function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const navigate = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery(
    ['cards', debouncedKeyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: debouncedKeyword !== '',
    },
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>

      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => {
                navigate.push(`/card/${card.id}`)
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
