'use client'

import Icons from '@/_components/common/Icons'
import { bio, chat, deactivation } from '@/_ui/IconsPath'

const NavBar = () => {
  return (
    <div className="transform fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="w-[378px] h-[140px] shadow-xl rounded-[88px] flex justify-between rotate-180">
        <div className="ml-14 mb-12 rotate-180">
          <Icons name={bio} />
        </div>
        <div className="rotate-180 translate-y-24 bg-[#DADADA] rounded-full w-[72px] h-[72px]">
          <Icons name={chat} className="ml-6 mt-6" />
        </div>
        <div className="rotate-180 mr-14 mb-12">
          <Icons name={deactivation} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
