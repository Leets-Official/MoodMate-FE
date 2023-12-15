'use client'

import MypageSecondBoxContainer from '@/_components/mypage/containers/MypageSecondBoxContainer'
import MypageThirdBoxContainer from '@/_components/mypage/containers/MypageThirdBoxContainer'
import { useMyPageQuery } from '@/_hooks/useMypageQuery'
import React, { useEffect } from 'react'
import Loading from '@/_components/common/Loading'
import Profile from '@/_components/information/Profile'
import Error from '@/(route)/pages/500'

export default function MyPage() {
  const { isLoading, isError, data } = useMyPageQuery()
  useEffect(() => {
    console.log('data2', data?.myPageResponse)
  }, [data])
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <Error />
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
  } = data.myPageResponse

  return (
    <section className="scrollbar-hide">
      <Profile
        userNickname={userNickname}
        year={year}
        userDepartment={userDepartment}
      />
      <MypageSecondBoxContainer
        userKeywords={userKeywords}
        preferYearMax={preferYearMax}
        preferYearMin={preferYearMin}
        preferDepartmentPossible={preferDepartmentPossible}
        preferMood={preferMood}
      />
      <MypageThirdBoxContainer />
    </section>
  )
}
