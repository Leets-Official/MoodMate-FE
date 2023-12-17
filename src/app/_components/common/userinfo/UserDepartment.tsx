import { MY_DEPARTMENT_PAGE } from '@/_constants/info'
import { userInfoState } from '@/_atom/userinfo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import NormalButton from '../NormalButton'
import Accordion from '../Accordion'

interface UserDepartmentProps {
  pageNum: string
}

export default function UserDepartment({ pageNum }: UserDepartmentProps) {
  const route = useRouter()

  const [userInfo, setUserInfoState] = useRecoilState(userInfoState)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDepartmentSelect = (department: string) => {
    setIsOpen(false)

    setUserInfoState((prev) => ({ ...prev, department }))
  }

  const nextRoute = () => {
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const handleAccordionOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[168px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          {MY_DEPARTMENT_PAGE.GREETINGS}
        </div>
      </div>
      <div>
        <Accordion
          selectedDepartment={userInfo.department}
          onDepartmentSelect={handleDepartmentSelect}
          onOpen={handleAccordionOpen}
          isOpen={isOpen}
        />
      </div>
      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`absolute bottom-0 font-sans text-darkgray rounded-md ${
          userInfo.department
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={!!userInfo.department}
      />
    </div>
  )
}
