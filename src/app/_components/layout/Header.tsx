'use client'

import { home } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Icons from '../common/Icons'

const Header = ({ chat }: { chat?: boolean }) => {
  return (
    <section className="flex items-center justify-between w-full h-[47px] px-[26px]">
      <h1 className="text-[20px] font-bold">채팅</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <Icons name={home} />
      </div>
    </section>
  )
}

export default Header
