import { useRouter } from 'next/navigation'
import { RANGE_BAR_AGE, MY_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import RangeBar from '../RangeBar'
import NormalButton from '../NormalButton'

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

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const [singleValue, setSingleValue] = useState<number[]>(
    userInfo.birthYear !== 0 ? [userInfo.birthYear] : [RANGE_BAR_AGE.MIN],
  )

  const myCharacter =
    userInfo.gender === 'FEMALE'
      ? '/illustration/female/age/myage.png'
      : '/illustration/male/age/myage.png'

  const handleSingleChange = (newValues: number[]) => {
    setSingleValue(newValues)
  }

  const nextRoute = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      birthYear: singleValue[0],
    }))

    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)

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
        <img src={myCharacter} alt="" width="149" height="atuo" />
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
