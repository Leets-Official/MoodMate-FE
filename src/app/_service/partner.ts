import api from './axios'

/** 상대방 정보 가져오기 */
export const getPartnerInfo = async () => {
  try {
    return await api.get('/users/partner', {}).then((res) => res.data)
  } catch (error) {
    throw error
  }
}
