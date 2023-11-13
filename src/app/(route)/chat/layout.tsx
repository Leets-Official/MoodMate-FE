import Header from '@/_components/layout/Header'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header chat />
        {children}
      </body>
    </html>
  )
}
