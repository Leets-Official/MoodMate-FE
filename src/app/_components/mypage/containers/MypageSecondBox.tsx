'use client'

import React, { useState } from 'react'

const MypageSecondBox = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <section className="flex flex-col">
      <p className="ml-4 mt-2 text-[12px] text-[#808080]">내가 고른 항목</p>
      <div className="ml-4 mt-2">
        <div>
          <button
            type="button"
            onClick={() => {
              setVisible(!visible)
            }}
          >
            버튼
          </button>
          {visible && <p id="content">content1</p>}
          <p id="content">content2</p>
          <p id="content">content3</p>
        </div>
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}

export default MypageSecondBox
