const mockData: NotificationDataPayload = {
  title: '새로운 알림',
  body: '이 알림은 테스트용입니다.',
}

// 모의 토큰 목록
const mockTokenList = [
  'ExampleToken1',
  'ExampleToken2',
  'ExampleToken3',
  'ExampleToken4',
  'ExampleToken5',
]

// 푸시 알림 전송 mock
export const sendFCMNotification = async (data: NotificationDataPayload) => {
  const notificationData = {
    ...mockData,
    tokens: mockTokenList,
  }

  // 백에서는 admin.messaging().sendMulticast(notificationData) 호출
  return {
    failureCount: 0,
    successCount: mockTokenList.length,
    responses: mockTokenList.map((token) => ({
      success: true,
      messageId: 'mock-message-id',
      canonicalRegistrationToken: token,
    })),
  }
}
