self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {})

self.addEventListener('push', function (e) {
  if (!e.data.json()) return

  //   const resultData = e.data.json().notification
  //   const notificationTitle = resultData.title
  const title = '무드메이트'
  const body = '무디에게 연락이 왔습니다!! 채팅을 확인해보세용'

  //   const notificationOptions = {
  //     body: resultData.body,
  //     icon: resultData.image,
  //     tag: resultData.tag,
  //     ...resultData,
  //   }
  const notificationOptions = {
    title: title,
    body: body,
    icon: 'public/icon-192x192.png',
  }
  self.registration.showNotification(title, notificationOptions)
  //   self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  const url = '/'
  event.notification.close()
  event.waitUntil(clients.openWindow(url))
})
