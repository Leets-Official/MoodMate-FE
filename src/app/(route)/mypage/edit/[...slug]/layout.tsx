import BackHeader from '@/_components/layout/BackHeader'
import { PROGRESS_BAR } from '@/_constants'

interface ProgressBarProps {
  children: React.ReactNode
  params: {
    slug: keyof typeof PROGRESS_BAR
  }
}

export default function MyinfoLayout({ children, params }: ProgressBarProps) {
  return (
    <main className="flex flex-col items-center">
      {params.slug >= '1' && params.slug <= '4' && (
        <>
          <BackHeader slug={params.slug} />
        </>
      )}
      {children}
    </main>
  )
}
