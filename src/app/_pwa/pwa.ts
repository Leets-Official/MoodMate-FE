// export const checkPermission = async (): Promise<ServiceWorkerRegistration> => {
//   return await navigator.serviceWorker.register('/sw.js', {
//     updateViaCache: 'none',
//   })
//   // if (!('serviceWorker' in navigator)) {
//   //   throw new Error('지원되지 않음!')
//   // }
// }

export const registerSW = async (): Promise<ServiceWorkerRegistration> => {
  const registration = await navigator.serviceWorker.register('sw.js')
  return registration
}

export const requestNotificationPermission = async (): Promise<void> => {
  const permission =
    (await Notification.requestPermission()) as NotificationPermission
  if (permission !== 'granted') {
    throw new Error('알림 권한이 거부되었습니다.')
  } else {
    new Notification('Hello world!')
  }
}

export const subscribePushManager = async (
  serviceWorkerRegistration: ServiceWorkerRegistration,
): Promise<PushSubscription> => {
  return await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  })
}

export const notificationMain = async () => {
  // checkPermission()
  await requestNotificationPermission()
  await registerSW()
}
