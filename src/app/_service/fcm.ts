import admin, { ServiceAccount } from 'firebase-admin'

export const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FCM_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
  const notificationData: admin.messaging.Message = {
    data: {
      title: data.data.title,
      body: data.data.body,
      image: data.data.image,
      click_action: data.data.click_action,
    },
    token: data.data.token,
  }

  const res = await admin.messaging().send(notificationData)

  return res
}
