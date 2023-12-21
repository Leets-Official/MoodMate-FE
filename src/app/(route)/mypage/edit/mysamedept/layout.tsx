export default function MySameDept({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center">
      <div className="h-[16px"></div>
      {children}
    </main>
  )
}
