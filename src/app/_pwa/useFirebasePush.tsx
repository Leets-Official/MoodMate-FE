'use client'

import { useState, useEffect } from 'react'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const useFirebasePush = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const initPush = async () => {
      try {
        const result = await requestPushPermission()
        console.log(result)
      } catch (error) {
        console.error('permission 받기 에러', error)
        setIsPushEnabled(false)
      }
    }
    initPush()
  }, [])

  const requestPushPermission = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      const app = initializeApp(firebaseConfig)
      const messaging = getMessaging(app)

      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
        })
        if (token) {
          console.log(token)
          window.localStorage.setItem('fcmToken', token)
          setToken(token)
          //   await sendTokenToServer(token) // 백엔드 서버에 저장
          setIsPushEnabled(true)
        } else {
          setIsPushEnabled(false)
        }
        onMessage(messaging, (payload) => {
          console.log('포그라운드 받은 메시지 출력: ', payload)
        })
      } catch (error) {
        console.error('fcm 토큰 받기 에러', error)
        setIsPushEnabled(false)
      }
    } else {
      console.error(' window.navigator를 찾을 수 없습니다.')
      setIsPushEnabled(false)
    }
  }

  const sendPush = async ({
    title,
    body,
    click_action,
    token,
  }: {
    title: string
    body: string
    click_action: string
    token: string
  }) => {
    const message = {
      data: {
        title,
        body,
        image: 'public/icon-192x192.png',
        click_action,
        token,
      },
    }

    const res = await fetch(window?.location?.origin + '/api/fcm', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('post res :: ', res)
  }

  const sendTokenToServer = async (token: string) => {
    try {
      //   await axios.post('/fcm', { token }) 백엔 서버 엔드포인트로 변경
      alert('푸쉬알림을 허용했습니다.')
      console.log('푸쉬알림 토큰 전송 성공')
    } catch (error) {
      console.error('Error sending token to server:', error)
      setIsPushEnabled(false)
    }
  }

  return { isPushEnabled, token, requestPushPermission, sendPush }
}

export default useFirebasePush
