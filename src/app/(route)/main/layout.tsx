export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div id="mainPortal" />
      {children}
    </main>
  )
}
