import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/store/provider'

// import Loading from '@/app/loading'
import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/nav'

import './globals.scss'

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
          {/* <Loading /> */}
          {children}
          <Footer />
          <Nav />
        </Providers>
      </body>
    </html>
  )
}
