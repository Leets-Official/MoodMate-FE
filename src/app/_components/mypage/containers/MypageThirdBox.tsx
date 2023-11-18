import React from 'react'
import Icons from '@/_components/common/Icons'
import { logout } from '@/_ui/IconsPath'

const MypageThirdBox = () => {
  return (
    <section className="ml-6 mt-4">
      <p className="text-[12px] text-[#808080]">로그인</p>
      <div className="mt-4 flex">
        <Icons name={logout} className="mt-1" />
        <p className="text-[16px] ml-2.5">로그아웃</p>
      </div>
    </section>
  )
}

export default MypageThirdBox
