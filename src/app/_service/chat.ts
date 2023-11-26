import { parseCookies } from 'nookies'

/** 채팅 내역 가져오기 */
export const getMessages = async (
  userId: number,
  size: number,
  page: number,
) => {
  const cookies = parseCookies()
  const access_token = cookies.access_token

  const params = new URLSearchParams({
    userId: userId.toString(),
    size: size.toString(),
    page: page.toString(),
  })
  try {
    const response = await fetch(`/chat?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        // authorization: 'Bearer ' + access_token,
      },
    }).then<ResponseChatGet>((res) => res.json())

    return response
  } catch (e: any) {
    console.log('채팅 기록 가져오기 에러 : ', e.message)
    throw e
  }
}
