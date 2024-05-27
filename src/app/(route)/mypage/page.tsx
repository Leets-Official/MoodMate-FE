'use client'

import MypageSecondBoxContainer from '@/_components/mypage/containers/MypageSecondBoxContainer'
import MypageThirdBoxContainer from '@/_components/mypage/containers/MypageThirdBoxContainer'
import { useMyPageQuery } from '@/_hooks/useMypageQuery'
import Loading from '@/_components/common/Loading'
import Profile from '@/_components/information/Profile'
import ErrorPage from '@/(route)/error'
import Header from '@/_components/layout/Header'

export default function MyPage() {
  const { isLoading, isError, data } = useMyPageQuery()
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <ErrorPage />
  }

  const {
    userGender,
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
      <div className="mt-6">
        <Header mypage partner />
      </div>
      <Profile
        userGender={userGender}
        userNickname={userNickname}
        year={year}
        userDepartment={userDepartment}
        preferMood={preferMood}
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
