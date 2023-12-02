'use client'

import Header from '@/_components/layout/Header'
import ProgressBar from '@/_components/common/ProgressBar'

interface ProgressBarProps {
  children: React.ReactNode
  params: {
    slug: number
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
