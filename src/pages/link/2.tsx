import Link from 'next/link'
import Spacing from '@shared/Spacing'

function Link2Page() {
  return (
    <div>
      Link2Page
      <Spacing size={1000} />
      <Link href="/link/3">Link2로 이동</Link>
    </div>
  )
}

export default Link2Page
