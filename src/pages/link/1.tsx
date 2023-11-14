import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Link1Page() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/link/2')
  }, [router])

  const moveTo2Page = () => {
    router.push('/link/2')
  }

  return (
    <div>
      Link1Page
      <div onClick={moveTo2Page}>Link2로 이동</div>
    </div>
  )
}

export default Link1Page
