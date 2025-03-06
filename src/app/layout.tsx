import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next Todo · leeebug',
  description: '인프런 워밍업 클럽 3기 풀스택 과제 1번 - Next Todo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={`${notoSansKR.className} antialiased`}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
