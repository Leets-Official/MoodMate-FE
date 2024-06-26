'use client'

import ChatInputContainer from '@/_components/chat/containers/ChatInputContainer'
import ChatRoomContainer from '@/_components/chat/containers/ChatRoomContainer'
import ChatHeader from '@/_components/layout/ChatHeader'
import { useEffect, useRef } from 'react'

interface ChatRoomPageProps {
  params: {
    slug: string[]
  }
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const [userId, roomId] = params.slug
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollTop = pageRef.current.scrollHeight
    }
  }, [])

  return (
    <section
      className="w-full h-full bg-yellow scrollbar-hide flex flex-col justify-center items-center"
      ref={pageRef}
    >
      <ChatHeader userId={Number(userId)} />
      <ChatRoomContainer userId={Number(userId)} roomId={Number(roomId)} />
      <ChatInputContainer userId={Number(userId)} roomId={Number(roomId)} />
    </section>
  )
}
