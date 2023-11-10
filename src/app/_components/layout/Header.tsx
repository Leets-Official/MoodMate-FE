'use client'

import { back, deactivation, hamburger } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import Icons from '../common/Icons'

const Header = ({ chat }: { chat?: boolean }) => {
  const router = useRouter()
  return (
    <section className="flex items-center justify-between w-full h-[47px] px-[26px]">
      <Icons name={back} onClick={() => router.back()} />
      <div className="flex flex-row items-center justify-center gap-3">
        {chat && (
          <>
            {/* 채팅 종료 */}
            <Icons name={deactivation} />
            <Icons name={hamburger} />
          </>
        )}
      </div>
    </section>
  )
}

export default Header
