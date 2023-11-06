import { getDoc, doc, collection } from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTIONS } from '@constants/collection'
import { Event } from '@models/event'

export async function getEvent(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.EVENT), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Event),
  }
}
