export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <div id="mainPortal" />
    </main>
  )
}
