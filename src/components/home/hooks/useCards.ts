import { useQuery } from 'react-query'
import { getCards } from '@remote/card'

function useCards() {
  return useQuery(['cards'], () => getCards(), {
    suspense: true,
  })
}

export default useCards
