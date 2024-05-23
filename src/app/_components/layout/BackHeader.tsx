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
  const params = useSearchParams().get('edit') === 'true'

  const shouldShowBackIcon = params
    ? pageNumber.toString() !== '1' && pageNumber.toString() !== '2'
    : pageNumber.toString() !== '1'

  return (
    <section className="flex items-center justify-between w-full px-[10%] mt-[35px] mb-[20px]">
      {shouldShowBackIcon ? (
        <Link
          href="#"
          onClick={() => router.back()}
          className="flex flex-row w-5 h-5 items-center justify-center gap-3 cursor-pointer"
        >
          <Icons name={back} />
        </Link>
      ) : (
        <div className="h-5" />
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
