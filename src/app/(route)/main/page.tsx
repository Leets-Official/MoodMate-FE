'use client'

import MainPage from '@/_components/main/MainPage'
import { useMainQuery } from '@/_hooks/useMainQuery'
import React from 'react'
import InactivePage from '@/_components/inactive/InActivePage'
import Loading from '@/_components/common/Loading'

export default function MainpagePage() {
  const { isLoading, isError, data } = useMainQuery()

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error occurred while fetching data</div>
  }
  const { roomActive, userMatchActive, userGender } = data.mainPageResponse
  const mainPageType = roomActive ? 'AFTER' : 'BEFORE'
  const mainPageGender = userGender === 'MALE' ? 'MALE' : 'FEMALE'
  return (
    <section className="scrollbar-hide h-screen">
      {userMatchActive ? (
        <MainPage type={mainPageType} gender={mainPageGender} />
      ) : (
        <InactivePage />
      )}
    </section>
  )
}
