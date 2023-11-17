'use client'

import Icons from '@/_components/common/Icons'
import { IconPathTypes } from '@/_types/icon'

const NavBar = () => {
  return (
    <div className="transform fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="w-[378px] h-[140px] shadow-xl rounded-3xl flex justify-between rotate-180">
        <div className="ml-10 mb-12 rotate-180">비활성화</div>
        <div className="rotate-180 translate-y-24 bg-[#DADADA] rounded-full w-[72px] h-[72px] text-center">
          채팅방
        </div>
        <div className="rotate-180 mr-10 mb-12">마이페이지</div>
      </div>
    </div>
  )
}

export default NavBar
