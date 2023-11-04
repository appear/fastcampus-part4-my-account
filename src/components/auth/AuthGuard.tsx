import { useSession } from 'next-auth/react'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
