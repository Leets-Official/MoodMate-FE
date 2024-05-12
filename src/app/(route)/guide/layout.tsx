export default function MypageLayout({
                                       children,
                                     }: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <div id="myPortal" />
    </main>
  )
}
