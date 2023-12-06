'use client'

import MainPage from '@/_components/main/MainPage'
import { useMainQuery } from '@/_hooks/useMainQuery'
import React, { useEffect } from 'react'
import InactivePage from '@/_components/inactive/InActivePage'
import Loading from '@/_components/common/Loading'
import Cookies from 'js-cookie'

export default function MainpagePage() {
  const { isLoading, isError, data } = useMainQuery()

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error occurred while fetching data</div>
  }
  const { roomActive, userMatchActive } = data.mainPageResponse
  return (
    <section>
      {userMatchActive ? <MainPage type="BEFORE" /> : <InactivePage />}
    </section>
  )
}
