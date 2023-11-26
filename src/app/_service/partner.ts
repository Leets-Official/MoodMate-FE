import { parseCookies } from 'nookies'

/** 상대방 정보 가져오기 */
export const getPartnerInfo = async (userId: number) => {
  const cookies = parseCookies()
  const access_token = cookies.access_token

  const params = new URLSearchParams({
    userId: userId.toString(),
  })

  try {
    const response = await fetch(`/chat/partner?${params.toString()}`, {
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
