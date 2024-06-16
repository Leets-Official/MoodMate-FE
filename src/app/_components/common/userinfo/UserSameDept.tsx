import { useRouter } from 'next/navigation'
import { MATCHING_DEPARTMENT_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { editUserInfoState, preferInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface UserSameDeptProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserSameDept({ pageNum, isEdit }: UserSameDeptProps) {
  const route = useRouter()

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(preferInfoState)
  const sameDeptData = isEdit
    ? editUserInfo.preferDepartmentPossible
    : userInfo.preferDepartmentPossible
  const [trueButtonSelected, setTrueButtonSelected] = useState<boolean>(
    sameDeptData === true,
  )
  const [falseButtonSelected, setFalseButtonSelected] = useState<boolean>(
    sameDeptData === false,
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const nextRoute = () => {
    const selectedDept = !!trueButtonSelected
    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          preferDepartmentPossible: selectedDept,
        }))
      : setUserInfoState((prev) => ({
          ...prev,
          preferDepartmentPossible: selectedDept,
        }))

    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
  }

  const handleTrueButtonClick = () => {
    if (trueButtonSelected) {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: false,
          }))
        : setUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: false,
          }))
      setTrueButtonSelected(false)
    } else {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: true,
          }))
        : setUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: true,
          }))
      setTrueButtonSelected(true)
      setFalseButtonSelected(false)
    }
  }

  const handleFalseButtonClick = () => {
    if (falseButtonSelected) {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: true,
          }))
        : setUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: true,
          }))
      setFalseButtonSelected(false)
    } else {
      isEdit
        ? setEditUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: false,
          }))
        : setUserInfoState((prev) => ({
            ...prev,
            preferDepartmentPossible: false,
          }))
      setFalseButtonSelected(true)
      setTrueButtonSelected(false)
    }
  }

  useEffect(() => {
    setTrueButtonSelected(sameDeptData === true)
    setFalseButtonSelected(sameDeptData === false)
  }, [userInfo])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{MATCHING_DEPARTMENT_PAGE.GREETINGS}</div>
        </div>
      </div>
      <div className="w-full flex">
        <SelectedButton
          buttonText={`${MATCHING_DEPARTMENT_PAGE.SAME_DEPT}\n${MATCHING_DEPARTMENT_PAGE.LIKE}`}
          buttonType="MAJOR"
          isActive
          onClick={handleTrueButtonClick}
          className={`ml-[7px] leading-none text-[14px] font-bold justify-end items-center rounded-3xl ${
            trueButtonSelected
              ? 'border-[1px] border-primary text-primary bg-onepink'
              : 'bg-zeropink '
          }`}
        />
        <SelectedButton
          buttonText={`${MATCHING_DEPARTMENT_PAGE.DIFF_DEPT}\n${MATCHING_DEPARTMENT_PAGE.LIKE}`}
          buttonType="MAJOR"
          isActive
          onClick={handleFalseButtonClick}
          className={`ml-[7px] leading-none text-[14px] font-bold justify-end items-center gap-[10px] rounded-3xl ${
            falseButtonSelected
              ? 'border-[1px] border-primary text-primary bg-onepink'
              : 'bg-zeropink '
          }`}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          trueButtonSelected || falseButtonSelected
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={trueButtonSelected || falseButtonSelected}
      />
    </div>
  )
}
