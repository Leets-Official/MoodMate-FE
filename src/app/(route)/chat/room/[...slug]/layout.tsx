export default function ChatRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <div id="exitPortal" />
    </main>
  )
}
