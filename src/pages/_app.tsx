import '@/styles/bootstrap.min.css'
import '@/styles/globals.css'
import Script from "next/script";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <Script src={'https://cdn.jsdelivr.net/gh/samm-waturu/cdn/jquery-1.12.0.min.js'} />
        <Script src={'https://cdn.jsdelivr.net/gh/samm-waturu/cdn/main.js'} />
        <Script src={'https://cdn.jsdelivr.net/gh/samm-waturu/cdn/jquery.fitvids.js'} />
        <Script src={'https://cdn.jsdelivr.net/gh/samm-waturu/cdn/bootstrap.min.js'} />
      </>


  )
}
