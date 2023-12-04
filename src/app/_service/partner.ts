import { parseCookies } from 'nookies'
import api from './axios'

/** 상대방 정보 가져오기 */
export const getPartnerInfo = async (userId: number) => {
  try {
    return await api
      .get('/chat/partner', {
        params: {
          userId: userId.toString(),
        },
      })
      .then((res) => res.data)
  } catch (error) {
    console.log('파트너 인포 가져오기 에러 : ', error)
    throw error
  }
}
