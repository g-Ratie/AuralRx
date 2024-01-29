import { NextAuthProvider } from '@/components/NextAuthProvider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caravan Tokyo',
  description: 'Geek Hackathon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
