'use client'

import { useRecoilValue } from 'recoil'
import { editUserNickname } from '@/_atom/userinfo'

interface YearDeptProps {
  age: string
  userDepartment: string
}
const YearDept = ({ age, userDepartment }: YearDeptProps) => {
  const userInfo = useRecoilValue(editUserNickname)
  return (
    !userInfo.isNicknameEdit && (
      <div className="mt-3 justify-center px-4 pt-[4px] h-[30px] text-[14px] text-[#4D4D4D] flex mx-auto border border-[#4D4D4D] rounded-[25px]">
        <p className="mr-3">{age}년생</p>
        <p className="mr-3 ">|</p>
        <p>{userDepartment}</p>
      </div>
    )
  )
}

export default YearDept
