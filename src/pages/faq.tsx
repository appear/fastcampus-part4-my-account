import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import ListRow from '@shared/ListRow'

interface FAQ {
  id: string
  question: string
  answer: string
}

// function FAQPage({ faqs }: { faqs: FAQ[] }) {
function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    getDocs(collection(store, COLLECTIONS.FAQ)).then((snapshot) => {
      const faqs = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as FAQ,
      )

      setFaqs(faqs)
    })
  }, [])

  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

// export async function getStaticProps() {
//   const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))

//   const faqs = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }))

//   return {
//     props: { faqs },
//   }
// }

export default FAQPage
