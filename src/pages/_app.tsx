import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

import globalSteyls from '@styles/globalStyles'
import Layout from '@shared/Layout'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  console.log('_app')

  return (
    <Layout>
      <Global styles={globalSteyls} />
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
