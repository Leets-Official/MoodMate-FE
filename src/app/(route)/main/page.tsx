'use client'

import MainPage from '@/_components/main/MainPage'
import InactivePage from '@/_components/inactive/InActivePage'
import Loading from '@/_components/common/Loading'
import Error from '@/(route)/error'
import useFirebasePush from '@/_pwa/useFirebasePush'
import { useEffect, useState } from 'react'
import { useMainQuery } from '@/_hooks/useMainQuery'
import { getCookie } from '@/utils/cookieutils'

export default function MainpagePage() {
  const { isLoading, isError, data } = useMainQuery()
  const { requestPushPermission } = useFirebasePush()

  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')

  useEffect(() => {
    requestPushPermission()
  }, [])

  useEffect(() => {
    if (accessToken?.length === 0 && refreshToken?.length === 0) {
      window.location.href = '/login'
    }
  }, [accessToken, refreshToken])

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <Error />
  }
  const { roomActive, userMatchActive, userGender, roomId, userId } =
    data.mainPageResponse
  const mainPageType = roomActive ? 'AFTER' : 'BEFORE'
  const mainPageGender = userGender === 'MALE' ? 'MALE' : 'FEMALE'
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <section className={`h-[${windowHeight - 243}] w-full scrollbar-hide`}>
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
