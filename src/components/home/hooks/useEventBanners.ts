import { useQuery } from 'react-query'

import { getEventBanners } from '@remote/banner'

function useEventBanners() {
  // TODO: user 가 계좌를 보유하고있는가 ?
  return useQuery(
    ['event-banners'],
    () => getEventBanners({ hasAccount: false }),
    {
      suspense: true,
    },
  )
}

export default useEventBanners
