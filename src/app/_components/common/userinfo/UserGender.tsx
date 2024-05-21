import { useRouter } from 'next/navigation'
import { GENDER_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { editUserInfoState, userInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface UserGenderProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserGender({ pageNum, isEdit }: UserGenderProps) {
  const route = useRouter()

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const genderData = isEdit ? editUserInfo.userGender : userInfo.gender
  const [maleButtonSelected, setMaleButtonSelected] = useState<boolean>(
    genderData === 'MALE',
  )
  const [femaleButtonSelected, setFemaleButtonSelected] = useState<boolean>(
    genderData === 'FEMALE',
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const nextRoute = () => {
    const selectedGender = maleButtonSelected ? 'MALE' : 'FEMALE'
    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          userGender: selectedGender,
        }))
      : setUserInfoState((prev) => ({ ...prev, gender: selectedGender }))
    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
  }

  const handleMaleButtonClick = () => {
    if (maleButtonSelected) {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            userGender: '',
          }))
        : setUserInfoState((prev) => ({ ...prev, gender: '' }))
      setMaleButtonSelected(false)
    } else {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            userGender: 'MALE',
          }))
        : setUserInfoState((prev) => ({ ...prev, gender: 'MALE' }))
      setMaleButtonSelected(true)
      setFemaleButtonSelected(false)
    }
  }

  const handleFemaleButtonClick = () => {
    if (femaleButtonSelected) {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            userGender: '',
          }))
        : setUserInfoState((prev) => ({ ...prev, gender: '' }))
      setFemaleButtonSelected(false)
    } else {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            userGender: 'FEMALE',
          }))
        : setUserInfoState((prev) => ({ ...prev, gender: 'FEMALE' }))
      setMaleButtonSelected(false)
      setFemaleButtonSelected(true)
    }
  }

  useEffect(() => {
    setMaleButtonSelected(
      (isEdit ? editUserInfo.userGender : userInfo.gender) === 'MALE',
    )
    setFemaleButtonSelected(
      (isEdit ? editUserInfo.userGender : userInfo.gender) === 'FEMALE',
    )
  }, [userInfo])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl">
          <div>{GENDER_PAGE.GREETINGS1}</div>
          <div>{GENDER_PAGE.GREETINGS2}</div>
        </div>
      </div>
      <div className="w-full flex">
        <SelectedButton
          buttonText={GENDER_PAGE.MALE}
          buttonType="GENDER"
          isActive
          onClick={handleMaleButtonClick}
          imgSrc="/illustration/common/gender/male.png"
          imgSizeW={106}
          imgSizeH={110}
          imgClassName="mb-2"
          className={`mr-[7px] bg-zeroyellow text-primary text-[14px] font-bold justify-end items-center gap-[10px] rounded-3xl ${
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
          imgClassName="mb-2"
          className={`ml-[7px] bg-zeroyellow text-primary text-[14px] font-bold justify-end items-center gap-[10px] rounded-3xl ${
            femaleButtonSelected ? 'border-[1px] border-primary' : ''
          }`}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          maleButtonSelected || femaleButtonSelected
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={maleButtonSelected || femaleButtonSelected}
      />
    </div>
  )
}
