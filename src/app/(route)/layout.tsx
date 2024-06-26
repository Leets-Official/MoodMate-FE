import { QueryProvider, RecoilProvider } from '@/_context'
import '@/_ui/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '무드메이트',
  description: '하루 한번, 나와 비슷한 무드의 상대방을 매칭해보세요!',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="h-screen desktop:w-[360px] desktop:mx-auto">
        <RecoilProvider>
          <QueryProvider>{children}</QueryProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
