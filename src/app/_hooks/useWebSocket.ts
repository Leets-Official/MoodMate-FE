import { realTimeMessagesState } from '@/_atom/chat'
import api from '@/_service/axios'
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
      client.configure({
        reconnectDelay: 5000,
      })
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
          console.log('웹소켓 연결 에러....')
          console.error('웹소켓 연결 에러:', error)
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

  const sendMessage = async (message: ChatMessageFromClient) => {
    if (stompClient?.connected && message) {
      const pushMessage = {
        fcmToken: localStorage.getItem('fcmToken'),
        message: message.content,
      }
      stompClient.send(
        `/pub/chat`,
        {},
        JSON.stringify({ ...message, token: `Bearer ${accessToken}` }),
      )
      try {
        await api.post('send', pushMessage)
      } catch (error) {
        console.error('fcm 메시지 send 실패 (backend api)', error)
      }
    }
  }

  return { sendMessage }
}

export default useWebsocket
