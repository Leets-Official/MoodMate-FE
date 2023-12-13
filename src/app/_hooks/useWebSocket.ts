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
  const accessToken = Cookies.get('realAccessToken')

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}chat`)
      const client = Stomp.over(socket)

      client.connect(
        {},
        () => {
          // client.send(
          //   `/pub/chat`,
          //   {},
          //   JSON.stringify({
          //     token: `Bearer ${accessToken}`,
          //     roomId,
          //     content: 'joined the chat',
          //   }),
          // )
          client.subscribe(`/sub/chat/${roomId}`, (res: any) => {
            const receivedMessage = {
              ...JSON.parse(res.body),
              isRead: true,
              messageId: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            }
            // senderId 비교하는 로직 추가
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
        // stompClient.send(
        //   `/pub/chat`,
        //   {},
        //   JSON.stringify({
        //     token: `Bearer ${accessToken}`,
        //     roomId,
        //     content: 'left the chat',
        //   }),
        // )
        stompClient.disconnect()
        setstompClient(null)
      }
    }
  }, [roomId, setRealTimeMessages, stompClient])

  const sendMessage = (message: { content: string; roomId: number }) => {
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
