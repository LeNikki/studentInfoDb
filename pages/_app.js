import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins ({
  weight: ['300'],
subsets: ['latin']
})
export default function App({ Component, pageProps }) {
  return (
    <main className= {poppins.className}>
    <Component {...pageProps} className='bg-slate-300 h-full'/>
    </main>
  )
 
}
