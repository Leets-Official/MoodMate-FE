'use client'

import MypageSecondBoxContainer from '@/_components/mypage/containers/MypageSecondBoxContainer'
import MypageThirdBoxContainer from '@/_components/mypage/containers/MypageThirdBoxContainer'
import { useMyPageQuery } from '@/_hooks/useMypageQuery'
import React, { useEffect } from 'react'
import Loading from '@/_components/common/Loading'
import Profile from '@/_components/information/Profile'

export default function MyPage() {
  const { isLoading, isError, data } = useMyPageQuery()
  useEffect(() => {
    console.log('data', data)
  }, [data])
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error...</div>
  }

  const {
    userNickname,
    year,
    userDepartment,
    userKeywords,
    preferYearMax,
    preferYearMin,
    preferDepartmentPossible,
    preferMood,
  } = data

  return (
    <div>
      {/* <Profile */}
      {/*   userNickname={userNickname} */}
      {/*   year={year} */}
      {/*   userDepartment={userDepartment} */}
      {/* /> */}
      {/* <MypageSecondBoxContainer */}
      {/*   userKeywords={userKeywords} */}
      {/*   preferYearMax={preferYearMax} */}
      {/*   preferYearMin={preferYearMin} */}
      {/*   preferDepartmentPossible={preferDepartmentPossible} */}
      {/*   preferMood={preferMood} */}
      {/* /> */}
      {/* <MypageThirdBoxContainer /> */}
    </div>
  )
}
