import { collection, doc, setDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { Transaction } from '@models/transaction'
import { store } from '@remote/firebase'

export function createTransaction(newTrasaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRASACTION)), newTrasaction)
}
