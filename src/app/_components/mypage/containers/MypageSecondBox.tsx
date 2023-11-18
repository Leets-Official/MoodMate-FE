'use client'

import React, { useState } from 'react'
import Keyword from '@/_components/information/Keyword'
import Icons from '@/_components/common/Icons'
import { downarrow, rightarrow } from '@/_ui/IconsPath'
import NormalButton from '@/_components/common/NormalButton'
import MoodyAge from '@/_components/information/MoodyAge'
import Department from '@/_components/information/Department'
import DateMood from '@/_components/information/DateMood'

const MypageSecondBox = () => {
  const [visibleone, setVisibleone] = useState<boolean>(false)
  const [visibletwo, setVisibletwo] = useState<boolean>(false)
  const [visiblethree, setVisiblethree] = useState<boolean>(false)
  const [visiblefour, setVisiblefour] = useState<boolean>(false)
  const [arrowIconone, setArrowIconone] = useState(rightarrow)
  const [arrowIcontwo, setArrowIcontwo] = useState(rightarrow)
  const [arrowIconthree, setArrowIconthree] = useState(rightarrow)
  const [arrowIconfour, setArrowIconfour] = useState(rightarrow)
  const toggleArrowIconone = () => {
    setArrowIconone(arrowIconone === rightarrow ? downarrow : rightarrow)
  }
  const toggleArrowIcontwo = () => {
    setArrowIcontwo(arrowIcontwo === rightarrow ? downarrow : rightarrow)
  }
  const toggleArrowIconthree = () => {
    setArrowIconthree(arrowIconthree === rightarrow ? downarrow : rightarrow)
  }
  const toggleArrowIconfour = () => {
    setArrowIconfour(arrowIconfour === rightarrow ? downarrow : rightarrow)
  }
  return (
    <section className="flex flex-col">
      <p className="ml-6 mt-4 text-[12px] text-[#808080]">내가 고른 항목</p>
      <div className="ml-6 mt-4">
        <div>
          <div className="flex">
            <Icons name={arrowIconone} className="mt-2" />
            <NormalButton
              buttonText="키워드"
              onClick={() => {
                setVisibleone(!visibleone)
                toggleArrowIconone()
              }}
              buttonType="small"
              className="-ml-2"
              color="white"
              isActive
            />
          </div>
          {visibleone && Keyword()}
        </div>
        <div className="mt-3">
          <div className="flex">
            <Icons name={arrowIcontwo} className="mt-2" />
            <NormalButton
              buttonText="무디나이"
              onClick={() => {
                setVisibletwo(!visibletwo)
                toggleArrowIcontwo()
              }}
              buttonType="small"
              className="-ml-1"
              color="white"
              isActive
            />
          </div>
          {visibletwo && MoodyAge()}
        </div>
        <div className="mt-3">
          <div className="flex">
            <Icons name={arrowIconthree} className="mt-2" />
            <NormalButton
              buttonText="선호 조건 선택"
              onClick={() => {
                setVisiblethree(!visiblethree)
                toggleArrowIconthree()
              }}
              buttonType="small"
              className="ml-3.5"
              color="white"
              isActive
            />
          </div>
          {visiblethree && Department()}
        </div>
        <div className="mt-3">
          <div className="flex">
            <Icons name={arrowIconfour} className="mt-2" />
            <NormalButton
              buttonText="데이트 무드"
              onClick={() => {
                setVisiblefour(!visiblefour)
                toggleArrowIconfour()
              }}
              buttonType="small"
              className="ml-1.5"
              color="white"
              isActive
            />
          </div>
          {visiblefour && DateMood()}
        </div>
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}
export default MypageSecondBox
