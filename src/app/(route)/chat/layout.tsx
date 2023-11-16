import Header from '@/_components/layout/Header'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header chat />
      {children}
    </main>
  )
}
