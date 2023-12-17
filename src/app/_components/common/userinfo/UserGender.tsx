import { useRouter } from 'next/navigation'
import { GENDER_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface UserGenderProps {
  pageNum: string
}

export default function UserGender({ pageNum }: UserGenderProps) {
  const route = useRouter()

  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const [maleButtonSelected, setMaleButtonSelected] = useState<boolean>(
    userInfo.gender === 'MALE',
  )
  const [femaleButtonSelected, setFemaleButtonSelected] = useState<boolean>(
    userInfo.gender === 'FEMALE',
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-[#FC4F59]',
  }

  const nextRoute = () => {
    const selectedGender = maleButtonSelected ? 'MALE' : 'FEMALE'
    setUserInfoState((prev) => ({ ...prev, gender: selectedGender }))
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const handleMaleButtonClick = () => {
    if (maleButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, gender: '' }))
      setMaleButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, gender: 'MALE' }))
      setMaleButtonSelected(true)
      setFemaleButtonSelected(false)
    }
  }

  const handleFemaleButtonClick = () => {
    if (femaleButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, gender: '' }))
      setFemaleButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, gender: 'FEMALE' }))
      setMaleButtonSelected(false)
      setFemaleButtonSelected(true)
    }
  }

  useEffect(() => {
    setMaleButtonSelected(userInfo.gender === 'MALE')
    setFemaleButtonSelected(userInfo.gender === 'FEMALE')
  }, [userInfo])

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{GENDER_PAGE.GREETINGS1}</div>
          <div>{GENDER_PAGE.GREETINGS2}</div>
        </div>
      </div>
      <div>
        <SelectedButton
          buttonText={GENDER_PAGE.MALE}
          buttonType="GENDER"
          isActive
          onClick={handleMaleButtonClick}
          imgSrc="/illustration/common/gender/male.png"
          imgSizeW={106}
          imgSizeH={110}
          className={`mr-[7px] bg-zeropink text-primary font-sans text-[14px] font-bold justify-end items-center gap-[10px] rounded-3xl ${
            maleButtonSelected ? 'border-[1px] border-primary' : ''
          }`}
        />
        <SelectedButton
          buttonText={GENDER_PAGE.FEMALE}
          buttonType="GENDER"
          isActive
          onClick={handleFemaleButtonClick}
          imgSrc="/illustration/common/gender/female.png"
          imgSizeW={106}
          imgSizeH={110}
          className={`ml-[7px] bg-zeropink text-primary font-sans text-[14px] font-bold justify-end items-center gap-[10px] rounded-3xl ${
            femaleButtonSelected ? 'border-[1px] border-primary' : ''
          }`}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`absolute bottom-0  text-darkgray rounded-md ${
          maleButtonSelected || femaleButtonSelected
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={maleButtonSelected || femaleButtonSelected}
      />
    </div>
  )
}
