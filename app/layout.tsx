import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/store/provider'

import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/nav'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Project',
  description: '국산차',
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
