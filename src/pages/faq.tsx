import { getDocs, collection } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import { useEffect, useState } from 'react'

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
      <Top
        title="FAQ"
        subTitle="자주 물어보시는 질문에 대한 답변을 준비했어요"
      />
      <ul>
        {faqs.map((faq) => (
          <ListRow
            key={faq.id}
            contents={
              <ListRow.Texts title={faq.question} subTitle={faq.answer} />
            }
          />
        ))}
      </ul>
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
//     props: {
//       faqs,
//     },
//   }
// }

export default FAQPage
