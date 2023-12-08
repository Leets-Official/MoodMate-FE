/* eslint-disable @typescript-eslint/no-explicit-any */
import { realTimeMessagesState } from '@/_atom/chat'
import { CompatClient, Stomp } from '@stomp/stompjs'
import Cookies from 'js-cookie'
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
      const accessToken = Cookies.get('realAccessToken')

      client.connect(
        { Authorization: `Bearer ${accessToken}` },
        (frame: any) => {
          console.log('Connected:', frame)
          handleConnected(frame)
          client.send(
            `/pub/chat/`,
            {},
            JSON.stringify({
              content: 'joined the chat',
            }),
          )
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
        },
      )

      client.debug = (msg: string) => {
        console.log('STOMP:', msg)
      }

      setstompClient(client)
    }

    const handleConnected = (frame: any) => {
      const serverInfo = frame.headers
      console.log('Server Info:', serverInfo)
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
  }, [roomId, setRealTimeMessages, stompClient])

  const sendMessage = (message: { content: string; roomId: number }) => {
    console.log(message)
    if (stompClient?.connected && message) {
      stompClient.send(`/pub/chat/`, {}, JSON.stringify(message))
    }
  }

  return { sendMessage }
}

export default useWebsocket
