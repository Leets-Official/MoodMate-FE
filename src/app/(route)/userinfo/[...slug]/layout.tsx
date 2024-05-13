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
  console.log('params dsfdkjsdjfajfkajskjfkdjfkjkjd', params.slug)
  return (
    <main className="flex flex-col items-center h-screen">
      {params.slug >= '1' && params.slug <= '8' && (
        <>
          <BackHeader slug={params.slug} />
          <ProgressBar current={params.slug} />
        </>
      )}
      {children}
    </main>
  )
}
