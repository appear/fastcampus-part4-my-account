import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDocs,
  where,
  getDoc,
  doc,
} from 'firebase/firestore'

import { Card } from '@models/card'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )
  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getSearchCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  )

  const cardSnapshot = await getDocs(searchQuery)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.CARD), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Card),
  }
}
