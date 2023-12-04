'use client'

import MainPage from '@/_components/main/MainPage'
import { useMainQuery } from '@/_hooks/useMainQuery'
import React, { useEffect } from 'react'
import InactivePage from '@/_components/inactive/InActivePage'

export default function MainpagePage() {
  const { isLoading, isError, data } = useMainQuery()
  if (isLoading) {
    return <div>Loading...</div>
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
