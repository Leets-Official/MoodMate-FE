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
  const { roomActive, userMatchActive } = data.mainPageResponse
  const mainPageType = roomActive ? 'AFTER' : 'BEFORE'
  return (
    <section>
      {userMatchActive ? <MainPage type={mainPageType} /> : <InactivePage />}
    </section>
  )
}
