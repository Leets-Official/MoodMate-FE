/* eslint-disable @typescript-eslint/no-explicit-any */
import { realTimeMessagesState } from '@/_atom/chat'
import { CompatClient, Stomp } from '@stomp/stompjs'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import SockJS from 'sockjs-client'

const useWebsocket = (roomId: number) => {
  const [stompClient, setstompClient] = useState<CompatClient | null>(null)
  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}chat`)
      const client = Stomp.over(socket)

      client.connect({}, (frame: any) => {
        console.log('Connected:', frame)
        client.subscribe(`/sub/chat/${roomId}`, (res: any) => {
          const receivedMessage = {
            ...JSON.parse(res.body),
            isRead: true,
            messageId: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }

          console.log('Received Message:', receivedMessage)
          setRealTimeMessages((prev: any) => [...prev, receivedMessage])
        })
      })

      client.debug = (msg: string) => {
        console.log('STOMP:', msg)
      }

      setstompClient(client)
    }

    if (roomId && !stompClient) {
      connectWebSocket()
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect()
        setstompClient(null)
      }
    }
  }, [roomId, stompClient])

  const sendMessage = (message: ChatMessageFromClient) => {
    console.log(message)
    if (stompClient?.connected && message) {
      stompClient.send(`/pub/chat/`, {}, JSON.stringify(message))
    }
  }

  return { sendMessage }
}

export default useWebsocket
