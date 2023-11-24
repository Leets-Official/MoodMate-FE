import StompJs from 'stompjs'
import { Client } from '@stomp/stompjs'
import { useCallback, useState } from 'react'
import SockJS from 'sockjs-client'

const useWebSocket = () => {
  const [client, setClient] = useState<Client | null>(null)

  const connect = useCallback((roomId: number) => {
    const sockJs = new SockJS('/chat')
    const stomp = StompJs.over(sockJs)
    const stompClient = new Client({
      webSocketFactory: () => sockJs,
      onConnect: (frame) => {
        console.log('연결됨!', frame)
        stompClient
          .subscribe(
            `/sub/chat/${roomId}`,
            (res) => {
              console.log(`/sub/chat/${roomId} 메시지 : `, JSON.parse(res.body))
            },
            {}, //header token 설정
          )
          .unsubscribe()
      },
      onDisconnect: () => {
        console.log('연결 해제!')
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers.message)
        console.error('Additional details:', frame.body)
      },
    })
    stompClient.activate()
    setClient(stompClient)
  }, [])

  const sendMessage = (message: RequestChatSendMessage) => {
    console.log(message)
    if (client && client.connected) {
      client.publish({
        //send?
        destination: `/pub/chat/`,
        body: JSON.stringify(message),
      })
    }
  }

  const disconnect = useCallback(() => {
    if (client && client.connected) {
      client.deactivate()
    }
  }, [client])

  return { connect, sendMessage, disconnect }
}

export default useWebSocket
