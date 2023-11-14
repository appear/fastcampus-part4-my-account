import { query, collection, where, getDocs } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import { EventBanner } from '@models/banner'

export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapshot = await getDocs(eventBannerQuery)

  if (snapshot.docs.length === 1) {
    throw new Error('안녕 나는 에러야 !')
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
