/* eslint-disable @typescript-eslint/no-explicit-any */
import { realTimeMessagesState } from '@/_atom/chat'
import { CompatClient, Stomp } from '@stomp/stompjs'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import SockJS from 'sockjs-client'

const getAccessToken = async () => {
  Cookies.remove('refreshToken', { domain: 'leets.moodmate.site' })
  const refresh = Cookies.get('refreshToken')
  const response = await axios.post(
    `${process.env.GOOGLE_LOGIN}users/refresh`,
    {
      refreshToken: refresh,
    },
  )

  const { accessToken, refreshToken } = response.data.tokenResponse
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')

  const accessTokenExpiry = new Date()
  accessTokenExpiry.setTime(accessTokenExpiry.getTime() + 6 * 60 * 60 * 1000)
  Cookies.set('accessToken', accessToken, { expires: accessTokenExpiry })

  const refreshTokenExpiry = new Date()
  refreshTokenExpiry.setTime(
    refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
  )
  Cookies.set('refreshToken', refreshToken, {
    expires: refreshTokenExpiry,
  })
  return Cookies.get('accessToken')
}

const useWebsocket = (roomId: number) => {
  const [stompClient, setstompClient] = useState<CompatClient | null>(null)
  const setRealTimeMessages = useSetRecoilState(realTimeMessagesState)
  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}chat`)
      const client = Stomp.over(socket)

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
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
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
    if (!accessToken && stompClient?.connected && message) {
      getAccessToken()
      stompClient.send(
        `/pub/chat`,
        {},
        JSON.stringify({
          ...message,
          token: `Bearer ${accessToken}`,
        }),
      )
    }
    if (accessToken && stompClient?.connected && message) {
    }
  }

  return { sendMessage }
}

export default useWebsocket
