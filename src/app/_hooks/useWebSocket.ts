<<<<<<< HEAD
import { realTimeMessagesState } from '@/_atom/chat'
import { CompatClient, Stomp } from '@stomp/stompjs'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
=======
import StompJs from 'stompjs'
import { Client } from '@stomp/stompjs'
import { useCallback, useState } from 'react'
>>>>>>> 3f934cb (:heavy_plus_sign: [chore] : stompjs 설치 (수정중))
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
        const receivedMessage = { ...JSON.parse(res.body) }

        console.log('메시지 : ', receivedMessage)
        // messageId: number
        // content: string
        // senderId: number
        // sendTime: string
        // isRead: number
        setRealTimeMessages((prev) => [...prev, receivedMessage.chatList])
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
