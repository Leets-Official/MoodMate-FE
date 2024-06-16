import { useRouter } from 'next/navigation'
import { RANGE_BAR_AGE, MY_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { editUserInfoState, userInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import RangeBar from '../RangeBar'
import NormalButton from '../NormalButton'
import Image from 'next/image'

interface UserMyageProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserMyage({ pageNum, isEdit }: UserMyageProps) {
  const route = useRouter()
  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }
  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const yearData = isEdit ? editUserInfo.year : userInfo.birthYear
  const [singleValue, setSingleValue] = useState<number[]>(
    yearData !== 0 ? [yearData] : [RANGE_BAR_AGE.MIN],
  )

  const myCharacter = (
    isEdit ? editUserInfo.userGender === 'FEMALE' : userInfo.gender === 'FEMALE'
  )
    ? '/illustration/female/age/myage.png'
    : '/illustration/male/age/myage.png'

  const handleSingleChange = (newValues: number[]) => {
    setSingleValue(newValues)
  }

  const nextRoute = () => {
    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          year: singleValue[0],
        }))
      : setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          birthYear: singleValue[0],
        }))
    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)

    setTimeout(() => {}, 0)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-start justify-between">
      <div className="relative flex flex-col items-start mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          {MY_AGE_PAGE.GREETINGS}
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          <div>{MY_AGE_PAGE.WARNINGS}</div>
        </div>
      </div>
      <div className="relative justify-center w-full flex flex-col items-center font-sans mb-[10%]">
        <div className="relative w-full h-[157px] flex justify-center items-center">
          <Image src={myCharacter} alt="" width={149} height={190} />
        </div>
        <RangeBar
          type="single"
          values={singleValue}
          onChange={handleSingleChange}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          singleValue[0] !== 0
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={singleValue[0] !== 0}
      />
    </div>
  )
}
