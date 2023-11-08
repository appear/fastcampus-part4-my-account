import { useQuery } from 'react-query'

import { getAccount } from '@remote/account'
import useUser from './useUser'

function useAccount() {
  const user = useUser()

  return useQuery(['account', user?.id], () => getAccount(user?.id as string), {
    enabled: user != null,
  })
}

export default useAccount
