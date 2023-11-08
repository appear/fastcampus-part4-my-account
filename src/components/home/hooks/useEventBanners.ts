import { useQuery } from 'react-query'

import { getEventBanners } from '@remote/banner'
import useAccount from '@hooks/useAccount'

function useEventBanners() {
  const { data: account } = useAccount()

  return useQuery(
    ['event-banners'],
    () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
    {
      suspense: true,
    },
  )
}

export default useEventBanners
