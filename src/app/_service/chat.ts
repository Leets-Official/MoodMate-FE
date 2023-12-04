import api from './axios'

/** 채팅 내역 가져오기 */
export const getMessages = async (
  roomId: number,
  userId: number,
  size: number,
  page: number,
) => {
  try {
    return await api
      .get('/chat', {
        params: {
          roomId: roomId.toString(),
          userId: userId.toString(),
          size: size.toString(),
          page: page.toString(),
        },
      })
      .then((res) => res.data)
  } catch (e: any) {
    console.log('채팅 기록 가져오기 에러 : ', e.message)
    throw e
  }
}

/** 채팅 종료 */
export const patchQuitChat = async () => {
  try {
    return await api.patch('/chat').then((res) => res.data) //message 콘솔 확인
  } catch (error) {
    console.log('채팅종료 에러 : ', error)
    throw error
  }
}
