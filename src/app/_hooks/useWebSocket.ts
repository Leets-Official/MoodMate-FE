import { Client } from '@stomp/stompjs'
import { useCallback, useState } from 'react'
import SockJS from 'sockjs-client'

const useWebSocket = () => {
  const [client, setClient] = useState<Client | null>(null)

  const connect = useCallback((roomId: number) => {
    const sockJs = new SockJS('/chat')
    const stompClient = new Client({
      webSocketFactory: () => sockJs, // stomp가 사용할 인스턴스
      onConnect: () => {
        console.log('연결됨!')
        stompClient.subscribe(`/sub/chat/${roomId}`, (message) => {
          console.log(`/sub/chat/${roomId}로 subscribe 성공!`, message)
        })
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

  const sendMessage = (roomId: number, message: string) => {
    console.log(roomId, message)
    if (client && client.connected) {
      client.publish({ destination: `/pub/chat/${roomId}`, body: message }) // send로 되는지 확인
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
