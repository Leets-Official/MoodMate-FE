import { MY_DEPARTMENT_PAGE } from '@/_constants/info'
import { editUserInfoState, userInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import NormalButton from '../NormalButton'
import Accordion from '../Accordion'

interface UserDepartmentProps {
  pageNum: string
  isEdit?: boolean
}

export default function UserDepartment({
  pageNum,
  isEdit,
}: UserDepartmentProps) {
  const route = useRouter()

  const [editUserInfo, setEditUserInfoState] = useRecoilState(editUserInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const departmentData = isEdit
    ? editUserInfo.userDepartment
    : userInfo.department
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDepartmentSelect = (department: string) => {
    setIsOpen(false)

    isEdit
      ? setEditUserInfoState((prev) => ({
          ...prev,
          userDepartment: department,
        }))
      : setUserInfoState((prev) => ({ ...prev, department }))
  }

  const nextRoute = () => {
    const params = isEdit ? '?edit=true' : ''
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}${params}`)
  }

  const handleAccordionOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="relative w-full flex flex-col items-start mt-[35px] mb-8">
        <div className="leading-normal text-darkgray font-bold text-xl">
          {MY_DEPARTMENT_PAGE.GREETINGS}
        </div>
      </div>
      <div className="relative w-full">
        <Accordion
          selectedDepartment={departmentData}
          onDepartmentSelect={handleDepartmentSelect}
          onOpen={handleAccordionOpen}
          isOpen={isOpen}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="userinfo"
        className={`relative mb-7 rounded-md text-darkgray ${
          departmentData
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={!!departmentData}
      />
    </div>
  )
}
