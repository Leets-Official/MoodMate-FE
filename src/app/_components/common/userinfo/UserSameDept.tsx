import { useRouter } from 'next/navigation'
import { MATCHING_DEPARTMENT_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { preferInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface UserSameDeptProps {
  pageNum: string
}

export default function UserSameDept({ pageNum }: UserSameDeptProps) {
  const route = useRouter()

  const [userInfo, setUserInfoState] = useRecoilState(preferInfoState)
  const [trueButtonSelected, setTrueButtonSelected] = useState<boolean>(
    userInfo.preferDepartmentPossible === true,
  )
  const [falseButtonSelected, setFalseButtonSelected] = useState<boolean>(
    userInfo.preferDepartmentPossible === false,
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-[#FC4F59]',
  }

  const nextRoute = () => {
    const selectedDept = !!trueButtonSelected
    setUserInfoState((prev) => ({
      ...prev,
      preferDepartmentPossible: selectedDept,
    }))
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const handleTrueButtonClick = () => {
    if (trueButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferDepartmentPossible: false }))
      setTrueButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferDepartmentPossible: true }))
      setTrueButtonSelected(true)
      setFalseButtonSelected(false)
    }
  }

  const handleFalseButtonClick = () => {
    if (falseButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferDepartmentPossible: true }))
      setFalseButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferDepartmentPossible: false }))
      setFalseButtonSelected(true)
      setTrueButtonSelected(false)
    }
  }

  useEffect(() => {
    setTrueButtonSelected(userInfo.preferDepartmentPossible === true)
    setFalseButtonSelected(userInfo.preferDepartmentPossible === false)
    console.log(userInfo)
  }, [userInfo])

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{MATCHING_DEPARTMENT_PAGE.GREETINGS}</div>
        </div>
      </div>
      <div>
        <SelectedButton
          buttonText={MATCHING_DEPARTMENT_PAGE.SAME_DEPT}
          buttonType="MAJOR"
          isActive
          onClick={handleTrueButtonClick}
          className={`ml-[7px] font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
            trueButtonSelected
              ? 'border-[1px] border-primary text-primary bg-onepink'
              : 'bg-zeropink '
          }`}
        />
        <SelectedButton
          buttonText={MATCHING_DEPARTMENT_PAGE.DIFF_DEPT}
          buttonType="MAJOR"
          isActive
          onClick={handleFalseButtonClick}
          className={`ml-[7px] font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
            falseButtonSelected
              ? 'border-[1px] border-primary text-primary bg-onepink'
              : 'bg-zeropink '
          }`}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`absolute bottom-0  text-darkgray rounded-md ${
          trueButtonSelected || falseButtonSelected
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={trueButtonSelected || falseButtonSelected}
      />
    </div>
  )
}
