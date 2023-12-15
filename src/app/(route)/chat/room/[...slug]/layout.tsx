export default function ChatRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="desktop:w-[360px] desktop:mx-auto ">
      {children}
      <div id="exitPortal" />
    </main>
  )
}
