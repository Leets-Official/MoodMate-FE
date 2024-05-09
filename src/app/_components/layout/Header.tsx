'use client'

import { back, home, pencile } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Icons from '../common/Icons'

interface HeaderProps {
  chat?: boolean
  partner?: boolean
  mypage?: boolean
}

const Header = ({ chat, partner, mypage }: HeaderProps) => {
  const router = useRouter()

  return (
    <section className="bg-white flex items-center justify-between w-full h-[8%] px-[26px]">
      {chat ? (
        <h1 className="text-[20px] font-bold">채팅</h1>
      ) : mypage ? (
        <div className="flex h-full w-full justify-between">
          <div className="cursor-pointer">
            <Icons name={back} onClick={() => router.back()} />
          </div>
          <div className="flex flex-row items-center justify-center gap-3 cursor-pointer">
            <Icons name={pencile} onClick={() => router.push('/userinfo/1')} />
          </div>
        </div>
      ) : (
        <div className="cursor-pointer">
          <Icons name={back} onClick={() => router.back()} />
        </div>
      )}

      <div className="flex flex-row items-center justify-center gap-3 cursor-pointer">
        {!partner && (
          <Link href="/main">
            <Icons name={home} />
          </Link>
        )}
      </div>
    </section>
  )
}

export default Header
