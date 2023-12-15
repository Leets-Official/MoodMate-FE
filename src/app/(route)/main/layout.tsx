export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div id="mainPortal" className="z-50" />
      {children}
    </main>
  )
}
