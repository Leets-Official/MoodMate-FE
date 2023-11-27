import api from './axios'

/** 채팅 내역 가져오기 */
export const getMessages = async (
  userId: number,
  size: number,
  page: number,
) => {
  try {
    const response = await api.get('/chat', {
      params: {
        userId: userId.toString(),
        size: size.toString(),
        page: page.toString(),
      },
    })

    return response.data
  } catch (e: any) {
    console.log('채팅 기록 가져오기 에러 : ', e.message)
    throw e
  }
}
