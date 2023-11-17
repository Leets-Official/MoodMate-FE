'use client'

import React, { useState } from 'react'
import Keyword from '@/_components/information/Keyword'
import Icons from '@/_components/common/Icons'
import { rightarrow } from '@/_ui/IconsPath'

const MypageSecondBox = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <section className="flex flex-col">
      <p className="ml-4 mt-2 text-[12px] text-[#808080]">내가 고른 항목</p>
      <div className="ml-4 mt-2">
        <div>
          <div className="flex">
            <Icons name={rightarrow} />
            <button
              type="button"
              onClick={() => {
                setVisible(!visible)
              }}
            >
              키워드
            </button>
          </div>
          {visible && Keyword()}
          <p id="content">content2</p>
          <p id="content">content3</p>
        </div>
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}

export default MypageSecondBox
