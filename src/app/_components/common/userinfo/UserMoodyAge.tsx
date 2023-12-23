import { useRouter } from 'next/navigation'
import { RANGE_BAR_AGE, MOODIE_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { preferInfoState, userInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import RangeBar from '../RangeBar'
import NormalButton from '../NormalButton'
import { editPreferInfoState } from '@/_atom/editinfo'

interface UserMoodyageProps {
  pageNum: string
  preferYearMax?: number
  preferYearMin?: number
}

export default function UserMoodyage({
  pageNum,
  preferYearMax,
  preferYearMin,
}: UserMoodyageProps) {
  const route = useRouter()
  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const [userInfo, setUserInfo] = useRecoilState(preferInfoState)
  const [editInfo, setEditInfoState] = useRecoilState(editPreferInfoState)
  const [myInfo, setMyInfo] = useRecoilState(userInfoState)
  const moodyCharacter =
    myInfo.gender === 'FEMALE'
      ? '/illustration/female/age/partnerage.png'
      : '/illustration/male/age/partnerpage.png'

  const isEditAge =
    preferYearMax && preferYearMin
      ? [preferYearMin, preferYearMax]
      : [userInfo.preferYearMin, userInfo.preferYearMax]

  const [rangeValue, setRangeValue] = useState<number[]>(
    userInfo.preferYearMax !== 0 && userInfo.preferYearMin !== 0
      ? isEditAge
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
    setEditInfoState((prevEditInfo) => ({
      ...prevEditInfo,
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
      <div className="relative top-[0%] mt-[-50px] mb-[20px] left-[40%] ml-[-50px] w-[149px] h-[157px]flex justify-center items-center">
        <img src={moodyCharacter} alt="" width={149} height="auto" />
      </div>
      <div className="font-sans `justify-items-center flex flex-col items-center">
        <RangeBar
          type="range"
          values={rangeValue}
          onChange={handleRangeChange}
        />
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="large"
          className={`font-sans absolute bottom-0 text-darkgray rounded-md ${
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
