'use client'

import { back, home } from '@/_ui/IconsPath'
import { useRouter, useSearchParams } from 'next/navigation'
import { PROGRESS_BAR } from '@/_constants'
import Icons from '../common/Icons'
import Link from 'next/link'

interface BackHeaderProps {
  slug: keyof typeof PROGRESS_BAR
}

const BackHeader = ({ slug }: BackHeaderProps) => {
  const router = useRouter()
  const pageNumber = slug
  const params = useSearchParams().get('edit') === 'true' ? true : false

  return (
    <section className="flex items-center justify-between w-full px-[10%] mt-[35px] mb-[20px]">
      {pageNumber !== 1 ? (
        <Link
          href="#"
          onClick={() => router.back()}
          className="flex flex-row w-5 h-5 items-center justify-center gap-3 cursor-pointer"
        >
          <Icons name={back} />
        </Link>
      ) : (
        <div className="h-[16px]" />
      )}
      {params && (
        <div className="flex flex-row items-center justify-center gap-3 cursor-pointer">
          <Link href="/main">
            <Icons name={home} />
          </Link>
        </div>
      )}
    </section>
  )
}

export default BackHeader
