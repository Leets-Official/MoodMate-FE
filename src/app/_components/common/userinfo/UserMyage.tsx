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

  const myCharacter =
    userInfo.gender === 'FEMALE'
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
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div>
          <div className="leading-normal text-darkgray font-bold text-xl font-sans">
            {MY_AGE_PAGE.GREETINGS}
          </div>
          <div className="mt-[10px] text-secondary font-normal text-base font-sans">
            <div>{MY_AGE_PAGE.WARNINGS}</div>
          </div>
        </div>
      </div>
      <div className="relative top-[0%] mt-[-60px] mb-[20px]  left-[40%] ml-[-50px] w-[149px] h-[157px] flex justify-center items-center">
        <Image src={myCharacter} alt="" width={149} height={190} />
      </div>
      <div className="justify-items-center flex flex-col items-center font-sans">
        <RangeBar
          type="single"
          values={singleValue}
          onChange={handleSingleChange}
        />
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="large"
          className={`absolute bottom-0 mb-7 text-darkgray rounded-md ${
            singleValue[0] !== 0
              ? buttonStyles.activeStyles
              : buttonStyles.defaultStyles
          }`}
          isActive={singleValue[0] !== 0}
        />
      </div>
    </div>
  )
}
