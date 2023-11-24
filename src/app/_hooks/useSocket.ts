import { Stomp } from '@stomp/stompjs'
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from 'stompjs'

const useWebsocket = (roomId: number) => {
  const [stompClient, setstompClient] = useState<Client | null>(null)

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/chat') // endpoint 확인
    const client = Stomp.over(socket)

    client.connect({}, () => {
      client.subscribe(`/sub/chat/${roomId}`, (res) => {
        console.log('메시지 : ', JSON.parse(res.body))
      })
    })
  }, [])
}

export default useWebsocket
