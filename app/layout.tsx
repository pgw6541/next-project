import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Providers } from '@/redux/provider'

import Footer from '../components/footer/footer'
import Nav from '../components/nav/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Project',
  description: '이름 뭐로할까..',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="kr" className='container'>
      <body className={inter.className}>
        <Providers>

          {children}
          <Footer />
          <Nav />
          
        </Providers>
      </body>
    </html>
  )
}
