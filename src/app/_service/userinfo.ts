import api from './axios'

export const postUserInfo = async (userInfo: UserInfoData) => {
  try {
    const response = await api.post('/users/user-info', userInfo)
    return response.data
  } catch (error) {
    console.error('Error posting user info:', error)
    throw error
  }
}

export const postPreferInfo = async (preferInfo: PreferInfoData) => {
  try {
    const response = await api.post('/users/prefer-info', preferInfo)
    return response.data
  } catch (error) {
    console.error('Error posting prefer info:', error)
    throw error
  }
}
