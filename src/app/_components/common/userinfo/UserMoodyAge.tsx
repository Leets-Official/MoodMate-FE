import { useRouter } from 'next/navigation'
import { RANGE_BAR_AGE, MOODIE_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { preferInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import RangeBar from '../RangeBar'
import NormalButton from '../NormalButton'

interface UserMoodyageProps {
  pageNum: string
}

export default function UserMoodyage({ pageNum }: UserMoodyageProps) {
  const route = useRouter()
  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const [userInfo, setUserInfo] = useRecoilState(preferInfoState)

  const [rangeValue, setRangeValue] = useState<number[]>(
    userInfo.preferYearMax !== 0 && userInfo.preferYearMin !== 0
      ? [userInfo.preferYearMin, userInfo.preferYearMax]
      : [RANGE_BAR_AGE.MIN, RANGE_BAR_AGE.MAX],
  )

  const handleRangeChange = (newValues: number[]) => {
    setRangeValue(newValues)
  }

  const nextRoute = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      preferYearMax: rangeValue[1],
      preferYearMin: rangeValue[0],
    }))
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div>
          <div className="leading-normal text-darkgray font-bold text-xl font-sans">
            {MOODIE_AGE_PAGE.GREETINGS}
          </div>
          <div className="mt-[10px] text-secondary font-normal text-base font-sans">
            <div>{MOODIE_AGE_PAGE.WARNINGS}</div>
          </div>
        </div>
      </div>
      <div className="relative top-[0%] mt-[-50px] mb-[20px] left-[40%] ml-[-50px] w-[149px] h-[157px] text-darkgray flex justify-center items-center bg-lightgray">
        이미지
      </div>
      <div className="justify-items-center flex flex-col items-center">
        <RangeBar
          type="range"
          values={rangeValue}
          onChange={handleRangeChange}
        />
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="large"
          className={`absolute bottom-0 text-darkgray rounded-md ${
            rangeValue[0] !== 0
              ? buttonStyles.activeStyles
              : buttonStyles.defaultStyles
          }`}
          isActive={rangeValue[0] !== 0}
        />
      </div>
    </div>
  )
}
