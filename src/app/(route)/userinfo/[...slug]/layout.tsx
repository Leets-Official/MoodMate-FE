'use client'

import Header from '@/_components/layout/Header'
import ProgressBar from '@/_components/common/ProgressBar'
import { PROGRESS_BAR } from '@/_constants'

interface ProgressBarProps {
  children: React.ReactNode
  params: {
    slug: keyof typeof PROGRESS_BAR
  }
}

export default function MyinfoLayout({ children, params }: ProgressBarProps) {
  return (
    <main>
      <Header />
      <ProgressBar current={params.slug} />
      {children}
    </main>
  )
}
