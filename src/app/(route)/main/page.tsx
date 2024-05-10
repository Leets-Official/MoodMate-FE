'use client'

import MainPage from '@/_components/main/MainPage'
import { useMainQuery } from '@/_hooks/useMainQuery'
import InactivePage from '@/_components/inactive/InActivePage'
import Loading from '@/_components/common/Loading'
import Error from '@/(route)/error'
import { useEffect } from 'react'
import useFirebasePush from '@/_pwa/useFirebasePush'
import NormalButton from '@/_components/common/NormalButton'

export default function MainpagePage() {
  const { isLoading, isError, data } = useMainQuery()
  const { isPushEnabled, token, requestPushPermission, sendPush } =
    useFirebasePush()
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

  return (
    <section className="scrollbar-hide">
      {userMatchActive ? (
        <>
          <MainPage type={mainPageType} gender={mainPageGender} />
          <NormalButton
            onClick={requestPushPermission}
            buttonText="알림 요청"
            buttonType="small"
            className=""
            isActive
          />
        </>
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
