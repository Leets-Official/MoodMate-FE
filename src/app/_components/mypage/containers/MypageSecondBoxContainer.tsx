'use client'

import Keyword from '@/_components/information/Keyword'
import MoodyAge from '@/_components/information/MoodyAge'
import Department from '@/_components/information/Department'
import DateMood from '@/_components/information/DateMood'
import InfoDetail from '@/_components/common/InfoDetail'

const MypageSecondBoxContainer = () => {
  return (
    <section className="flex flex-col">
      <p className="ml-6 mt-4 text-[12px] text-[#808080]">내가 고른 항목</p>
      <div className="ml-6">
        <InfoDetail
          titleText="키워드"
          component={Keyword()}
          className=""
        />
        <InfoDetail
          titleText="무디 나이"
          component={MoodyAge()}
          className="ml-2"
        />
        <InfoDetail
          titleText="선호 조건 선택"
          component={Department()}
          className="ml-6"
        />
        <InfoDetail
          titleText="데이트 무드"
          component={DateMood()}
          className="ml-4"
        />
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}
export default MypageSecondBoxContainer
