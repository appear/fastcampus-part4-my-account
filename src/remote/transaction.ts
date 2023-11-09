import {
  QuerySnapshot,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { Transaction, TransactionType } from '@models/transaction'
import { store } from '@remote/firebase'

export function createTransaction(newTrasaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTrasaction)
}

export async function getTransactions({
  pageParam,
  userId,
}: {
  userId: string
  pageParam?: QuerySnapshot<TransactionType>
}) {
  const transactionQuery =
    pageParam == null
      ? query(
          collection(store, COLLECTIONS.TRANSACTION),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          limit(15),
        )
      : query(
          collection(store, COLLECTIONS.TRANSACTION),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          startAfter(pageParam),
          limit(15),
        )

  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}
