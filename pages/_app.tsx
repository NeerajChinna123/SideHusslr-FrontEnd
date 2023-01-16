import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Provider as RWBProvider } from "react-wrap-balancer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RWBProvider>
      <Component {...pageProps} />
      </RWBProvider>
    </SessionProvider>
    )
}
