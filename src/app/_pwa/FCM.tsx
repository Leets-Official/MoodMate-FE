import { useState, useEffect } from 'react'
import { getMessaging, getToken } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import axios from 'axios'

const firebaseConfig = {
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

  useEffect(() => {
    const initPush = async () => {
      try {
        await requestPushPermission()
      } catch (error) {
        console.error('permission 받기 에러', error)
        setIsPushEnabled(false)
      }
    }
    initPush()
  }, [])

  const requestPushPermission = async () => {
    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging(app)

    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
      })
      if (token) {
        localStorage.setItem('fcmToken', token)
        await sendTokenToServer(token)
        setIsPushEnabled(true)
      } else {
        setIsPushEnabled(false)
      }
    } catch (error) {
      console.error('fcm 토큰 받기 에러', error)
      setIsPushEnabled(false)
    }
  }

  const sendTokenToServer = async (token: string) => {
    try {
      await axios.post('/fcm', { token })
      alert('푸쉬알림을 허용했습니다.')
      console.log('푸쉬알림 토큰 전송 성공')
    } catch (error) {
      console.error('Error sending token to server:', error)
      setIsPushEnabled(false)
    }
  }

  return { isPushEnabled }
}

export default useFirebasePush
