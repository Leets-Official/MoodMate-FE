import Header from '@/_components/layout/Header'

export default function MyinfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
