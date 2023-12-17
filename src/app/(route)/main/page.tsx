'use client'

import MainPage from '@/_components/main/MainPage'
import { useMainQuery } from '@/_hooks/useMainQuery'
import InactivePage from '@/_components/inactive/InActivePage'
import Error from '@/(route)/error'

export default function MainpagePage() {
  const { isError, data } = useMainQuery()

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
