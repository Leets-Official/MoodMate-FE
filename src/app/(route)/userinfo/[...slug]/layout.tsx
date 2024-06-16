import BackHeader from '@/_components/layout/BackHeader'
import ProgressBar from '@/_components/common/ProgressBar'
import { PROGRESS_BAR } from '@/_constants'

interface ProgressBarProps {
  children: React.ReactNode
  params: {
    slug: keyof typeof PROGRESS_BAR
  }
}

export default function MyinfoLayout({ children, params }: ProgressBarProps) {
  const pageNum = parseInt(params.slug.toString())
  const limitedSlug = pageNum >= 1 && pageNum <= 8

  return (
    <main className="flex flex-col w-full items-center h-screen">
      {limitedSlug && (
        <>
          <BackHeader slug={params.slug} />
          <ProgressBar current={params.slug} />
        </>
      )}
      {children}
    </main>
  )
}
