export const checkPermission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('지원되지 않음!')
  }
}

export const registerSW = async () => {
  const registration = await navigator.serviceWorker.register('sw.js')
  return registration
}

export const requestNotificationPermission = async (): Promise<void> => {
  const permission =
    (await Notification.requestPermission()) as NotificationPermission
  if (permission !== 'granted') {
    const confirmAgain = confirm(
      '알림 권한이 거부되었습니다. 다시 요청하시겠습니까?',
    )
    if (confirmAgain) {
      return requestNotificationPermission() // 재귀 호출로 다시 요청
    } else {
      throw new Error('알림 권한이 거부되었습니다.')
    }
  } else {
    new Notification('Hello world!')
  }
}
