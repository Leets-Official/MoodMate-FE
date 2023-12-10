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

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}chat`)
      const client = Stomp.over(socket)
      const accessToken = Cookies.get('realAccessToken')
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      client.connect(
        headers,
        (frame: any) => {
          console.log('Connected:', frame)
          client.send(
            `/pub/chat`,
            {},
            JSON.stringify({
              roomId,
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
            console.log('Received Message from Partner:', res)
            console.log('Received Message from Partner:', receivedMessage)
            setRealTimeMessages((prev: any) => [...prev, receivedMessage])
          })
        },
        (error: undefined) => {
          console.log(`Error: ${error}`)
        },
      )

      client.debug = (msg: any) => {
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
  }, [roomId, setRealTimeMessages, stompClient])

  const sendMessage = (message: { content: string; roomId: number }) => {
    if (stompClient?.connected && message) {
      stompClient.send(`/pub/chat`, {}, JSON.stringify(message))
    }
  }

  return { sendMessage }
}

export default useWebsocket
