import { useRouter } from 'next/navigation'
import NormalButton from '../NormalButton'
import RangeBar from '../RangeBar'
import { RANGE_BAR_AGE, MY_AGE_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import { useState, useEffect } from 'react'

interface UserKeywordProps {
  pageNum: string
}

export default function UserMyage({ pageNum }: UserKeywordProps) {
  const route = useRouter()
  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const [singleValue, setSingleValue] = useState<number[]>(
    userInfo.year !== 0 ? [userInfo.year] : [RANGE_BAR_AGE.MIN],
  )

  const handleSingleChange = async (newValues: number[]) => {
    console.log(singleValue, 'this')
    console.log(newValues)
    await setSingleValue(newValues)
    console.log(singleValue, 'this2')
  }

  useEffect(() => {
    console.log(singleValue, 'updated value')
  }, [userInfo.year])

  const nextRoute = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      year: singleValue[0],
    }))

    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)

    setTimeout(() => {
      console.log(userInfo)
    }, 0)
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
      <div className="relative top-[0%] mt-[-50px] mb-[20px] left-[45%] ml-[-50px] w-[149px] h-[157px] text-darkgray flex justify-center items-center bg-lightgray">
        이미지
      </div>
      <div className="justify-items-center flex flex-col items-center">
        <RangeBar
          type="single"
          values={singleValue}
          onChange={handleSingleChange}
        />
        <NormalButton
          buttonText="다음"
          onClick={nextRoute}
          buttonType="large"
          className={`absolute bottom-0 text-darkgray rounded-md ${
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
