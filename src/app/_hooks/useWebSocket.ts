/* eslint-disable @typescript-eslint/no-explicit-any */
import { realTimeMessagesState } from '@/_atom/chat'
import { CompatClient, Stomp } from '@stomp/stompjs'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import SockJS from 'sockjs-client'

const useWebsocket = (roomId: number) => {
  const [stompClient, setstompClient] = useState<CompatClient | null>(null)
  const setRealTimeMessages = useSetRecoilState(realTimeMessagesState)
  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}chat`)
      const client = Stomp.over(socket)

      client.connect(
        {},
        () => {
          client.subscribe(`/sub/chat/${roomId}`, (res: any) => {
            const receivedMessage = {
              ...JSON.parse(res.body),
              isRead: true,
              messageId: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            }
            setRealTimeMessages((prev: any) => [...prev, receivedMessage])
          })
        },
        (error: undefined) => {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw error
        },
      )
      setstompClient(client)
    }

    if (roomId && !stompClient) {
      connectWebSocket()
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect()
        setRealTimeMessages([])
        setstompClient(null)
      }
    }
  }, [roomId, setRealTimeMessages, stompClient])

  const sendMessage = (message: ChatMessageFromClient) => {
    if (stompClient?.connected && message) {
      stompClient.send(
        `/pub/chat`,
        {},
        JSON.stringify({ ...message, token: `Bearer ${accessToken}` }),
      )
    }
  }

  return { sendMessage }
}

export default useWebsocket
