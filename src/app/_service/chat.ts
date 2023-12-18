import api from './axios'

/** 채팅 내역 가져오기 */
export const getMessages = async (
  roomId: number,
  size: number,
  page: number,
) => {
  try {
    return await api
      .get('/chat', {
        params: {
          roomId: roomId.toString(),
          size: size.toString(),
          page: page.toString(),
        },
      })
      .then((res) => res.data)
  } catch (error) {
    throw error
  }
}

/** 채팅 종료 */
export const patchQuitChat = async () => {
  try {
    return await api.patch('/chat').then((res) => res.data) // message 콘솔 확인
  } catch (error) {
    throw error
  }
}
