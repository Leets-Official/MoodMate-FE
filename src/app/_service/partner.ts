import api from './axios'

export const getPartnerInfo = async () => {
  try {
    return await api.get('/users/partner', {}).then((res) => res.data)
  } catch (error) {
    throw error
  }
}
