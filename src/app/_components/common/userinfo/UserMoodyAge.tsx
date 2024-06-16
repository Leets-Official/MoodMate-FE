import { useRouter } from 'next/navigation'
import { RANGE_BAR_AGE, MOODIE_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import {
  editUserInfoState,
  preferInfoState,
  userInfoState,
} from '@/_atom/userinfo'
import { useState } from 'react'
import RangeBar from '../RangeBar'
import NormalButton from '../NormalButton'
import Image from 'next/image'

interface UserMoodyageProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserMoodyage({ pageNum, isEdit }: UserMoodyageProps) {
  const route = useRouter()
  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfo] = useRecoilState(preferInfoState)
  const preferYearMaxData = isEdit
    ? editUserInfo.preferYearMax
    : userInfo.preferYearMax
  const preferYearMinData = isEdit
    ? editUserInfo.preferYearMin
    : userInfo.preferYearMin
  const [myInfo, setMyInfo] = useRecoilState(userInfoState)
  const moodyCharacter = (
    isEdit ? editUserInfo.userGender === 'FEMALE' : myInfo.gender === 'FEMALE'
  )
    ? '/illustration/female/age/partnerage.png'
    : '/illustration/male/age/partnerage.png'

  const [rangeValue, setRangeValue] = useState<number[]>(
    preferYearMaxData !== 0 && preferYearMinData !== 0
      ? [preferYearMinData, preferYearMaxData]
      : [RANGE_BAR_AGE.MIN, RANGE_BAR_AGE.MAX],
  )

  const handleRangeChange = (newValues: number[]) => {
    setRangeValue(newValues)
  }

  const nextRoute = () => {
    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          preferYearMax: rangeValue[1],
          preferYearMin: rangeValue[0],
        }))
      : setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          preferYearMax: rangeValue[1],
          preferYearMin: rangeValue[0],
        }))

    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          {MOODIE_AGE_PAGE.GREETINGS}
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          <div>{MOODIE_AGE_PAGE.WARNINGS}</div>
        </div>
      </div>
      <div className="relative justify-center w-full flex flex-col items-center font-sans mb-[10%]">
        <div className="relative w-full h-[157px] flex justify-center items-center">
          <Image src={moodyCharacter} alt="" width={149} height={190} />
        </div>
        <RangeBar
          type="range"
          values={rangeValue}
          onChange={handleRangeChange}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          rangeValue[0] !== 0
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={rangeValue[0] !== 0}
      />
    </div>
  )
}
