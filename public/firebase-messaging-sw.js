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

self.addEventListener('push', function (e) {
  if (!e.data.json()) return

  const data = e.data.json().data

  const options = {
    body: data.body,
    icon: data.image,
    image: data.image,
    data: {
      click_action: data.click_action,
    },
  }

  e.waitUntil(self.registration.showNotification(notification.title, options))
})

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  )

  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: payload,
    icon: 'public/icon-192x192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  const url = '/'
  event.notification.close()
  event.waitUntil(clients.openWindow(url))
})
