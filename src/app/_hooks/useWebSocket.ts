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
    const socket = new SockJS('http://localhost:8080/chat') // endpoint 확인
    const client = Stomp.over(socket)

    client.connect({}, (frame: string) => {
      console.log(frame)
      console.log('연결됨!', frame)
      client.subscribe(`/sub/chat/${roomId}`, (res) => {
        const receivedMessage = {
          ...JSON.parse(res.body),
          isRead: 0,
          messageId: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }

        console.log('메시지 : ', receivedMessage)
        setRealTimeMessages((prev) => [...prev, receivedMessage])
      })
    })

    client.activate()
    setstompClient(client)

    return () => {
      if (client && client.connected) {
        client.disconnect()
      }
    }
  }, [roomId])

  const sendMessage = (message: RequestChatSendMessage) => {
    console.log(message)
    if (stompClient?.connected && message) {
      stompClient.send(`/pub/chat/`, {}, JSON.stringify(message))
    }
  }

  return { sendMessage }
}

export default useWebsocket
