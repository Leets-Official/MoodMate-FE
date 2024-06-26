'use client'

import MainPage from '@/_components/main/MainPage'
import InactivePage from '@/_components/inactive/InActivePage'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'
import useFirebasePush from '@/_pwa/useFirebasePush'
import { useEffect } from 'react'
import { useMainQuery } from '@/_hooks/useMainQuery'
import { getCookie } from '@/utils/cookieutils'

export default function MainPagePage() {
  const { isLoading, isError, data } = useMainQuery()
  const { requestPushPermission } = useFirebasePush()

  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')

  useEffect(() => {
    if ((accessToken || refreshToken) === undefined) {
      window.location.href = '/login'
    }
  }, [accessToken, refreshToken])

  useEffect(() => {
    if (
      data &&
      Object.values(data?.mainPageResponse).some((item) => item === null)
    ) {
      window.location.href = '/login'
    }
  }, [data])

  useEffect(() => {
    requestPushPermission()
  }, [])

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <ErrorPage />
  }
  const { roomActive, userMatchActive, userGender, roomId, userId } =
    data.mainPageResponse
  const mainPageType = roomActive ? 'AFTER' : 'BEFORE'
  const mainPageGender = userGender === 'MALE' ? 'MALE' : 'FEMALE'

  return (
    <section className="h-full w-full scrollbar-hide">
      {userMatchActive ? (
        <MainPage type={mainPageType} gender={mainPageGender} />
      ) : (
        <InactivePage
          gender={mainPageGender}
          userId={userId}
          roomId={roomId}
          roomActive={roomActive}
        />
      )}
    </section>
  )
}
