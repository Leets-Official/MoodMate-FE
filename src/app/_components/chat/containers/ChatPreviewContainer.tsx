'use client'

import { useEffect, useState } from 'react'
import ChatPreview from '../chatlist/ChatPreview'

const ChatPreviewContainer = () => {
  const [userId, setUserId] = useState<number>(0) // 초깃값 0?
  useEffect(() => {
    const user = localStorage.getItem('userId')
    user && setUserId(() => Number(user))
  }, [])
  return (
    <section className="bg-neutral-300 w-full h-full flex justify-center pt-[34px]">
      <ChatPreview
        userId={userId}
        nickname="사랑스러운 무디"
        count={1}
        lastMessage="안녕하세요. 저랑 취향이 비슷 저랑 취향이 비슷 저랑 취향이 비슷하시네요. 저도 강아지
          좋아해요~"
        isRead={false}
      />
    </section>
  )
}

export default ChatPreviewContainer
