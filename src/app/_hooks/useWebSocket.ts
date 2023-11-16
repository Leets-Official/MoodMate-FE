import { Client } from '@stomp/stompjs'
import { useCallback, useState } from 'react'
import SockJS from 'sockjs-client'

const useWebSocket = () => {
  const [client, setClient] = useState<Client | null>(null)

  // useCallback으로 메모이제이션
  const connect = useCallback((roomId: number) => {
    const sockJs = new SockJS('url') // backend URL (http)
    const stompClient = new Client({
      webSocketFactory: () => sockJs, // stomp가 사용할 인스턴스
      onConnect: () => {
        console.log('Connected')
        stompClient.subscribe(`/chat/${roomId}`, (message) => {
          console.log('Received', message)
        })
      },
      onDisconnect: () => {
        console.log('Disconnected')
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers.message)
        console.error('Additional details:', frame.body)
      },
    })
    stompClient.activate()
    setClient(stompClient)
  }, [])

  const sendMessage = useCallback(
    (roomId: number, message: string) => {
      if (client && client.connected) {
        client.publish({ destination: `/chat/${roomId}`, body: message })
      }
    },
    [client],
  )

  const disconnect = useCallback(() => {
    if (client && client.connected) {
      client.deactivate()
    }
  }, [client])

  return { connect, sendMessage, disconnect }
}

export default useWebSocket
