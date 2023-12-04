'use client'

import { back } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import { PROGRESS_BAR } from '@/_constants'
import Icons from '../common/Icons'

interface BackHeaderProps {
  slug: keyof typeof PROGRESS_BAR
}

const BackHeader = ({ slug }: BackHeaderProps) => {
  const router = useRouter()
  const pageNumber = slug

  return (
    <section className="flex items-center justify-between w-[360px] px-[34px] mt-[35px] mb-[20px]">
      {pageNumber != 1 ? (
        <Icons name={back} onClick={() => router.back()} />
      ) : (
        <div className="h-[16px]"></div>
      )}
    </section>
  )
}

export default BackHeader
