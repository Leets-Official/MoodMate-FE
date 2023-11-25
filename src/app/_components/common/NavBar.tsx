'use client'

import Icons from '@/_components/common/Icons'
import { bio, chat, deactivation, whitechat } from '@/_ui/IconsPath'

interface TextProps {
  type: 'BEFORE' | 'AFTER'
}

const getTextStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return {
        box: 'bg-[#E6E6E6]',
        chat: 'bg-[#FEB3B8]',
        chating: chat,
      }
    case 'AFTER':
      return {
        box: 'bg-[#FFFFFF]',
        chat: 'bg-[#FC4F59]',
        chating: whitechat,
      }
    default:
      return {
        box: '',
        chat: '',
        chating: chat,
      }
  }
}
const NavBar = ({ type }: TextProps) => {
  return (
    <div className="w-full transform fixed bottom-0 left-1/2 -translate-x-1/2 ">
      <div
        className={`${
          getTextStyle(type).box
        } pt-11 h-[223px] rounded-[88px] translate-y-1/3 flex justify-between`}
      >
        <div className="ml-16">
          <Icons name={deactivation} />
        </div>
        <div
          className={`${
            getTextStyle(type).chat
          } rounded-full w-[72px] h-[72px] -mt-16`}
        >
          <Icons name={getTextStyle(type).chating} className="ml-6 mt-6" />
        </div>
        <div className="mr-16">
          <Icons name={bio} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
