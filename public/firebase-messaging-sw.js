importScripts(
  'https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js',
)

firebase.initializeApp({
  apiKey: 'AIzaSyDtIS6w6yIcZ6wik-X3DVmyr5a0myFK5zw',
  authDomain: 'moodmate-70168.firebaseapp.com',
  projectId: 'moodmate-70168',
  storageBucket: 'moodmate-70168.appspot.com',
  messagingSenderId: '402373130976',
  appId: '1:402373130976:web:8300c06f1df33bf8592e85',
})

const messaging = firebase.messaging()

self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {})

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  )

  const notificationTitle = 'Background 알림 수신'
  const notificationOptions = {
    body: payload,
    icon: 'public/illustration/common/chat/chatlist.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  const url = '/'
  event.notification.close()
  event.waitUntil(clients.openWindow(url))
})
