import {
  collection,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { Piggybank } from '@models/piggybank'
import { COLLECTIONS } from '@constants/collection'

export function createPiggybank(newPiggybank: Piggybank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}

export async function getPiggybank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const piggybank = snapshot.docs[0].data()

  return {
    id: snapshot.docs[0].id,
    ...(piggybank as Piggybank),
    startDate: piggybank.startDate.toDate(),
    endDate: piggybank.endDate.toDate(),
  }
}
