'use client'

import Icons from '@/_components/common/Icons'
import { bio, chat, deactivation } from '@/_ui/IconsPath'

const NavBar = () => {
  return (
    <div className="w-full transform fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="pt-11 h-[223px] rounded-[88px] translate-y-1/3 flex justify-between bg-[#E6E6E6]">
        <div className="ml-16">
          <Icons name={bio} />
        </div>
        <div className="bg-[#FEB3B8] rounded-full w-[72px] h-[72px] -mt-16">
          <Icons name={chat} className="ml-6 mt-6" />
        </div>
        <div className="mr-16">
          <Icons name={deactivation} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
