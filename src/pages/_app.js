import '@/styles/globals.css'
import initServer from "@/initServer";

initServer()
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}


