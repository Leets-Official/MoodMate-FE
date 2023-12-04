import api from './axios'

export const postUserInfo = async (userInfo: UserInfoData) => {
  try {
    const response = await api.post('/users/user-info', userInfo)
    return response.data
  } catch (error: any) {
    console.error('Error posting user info:', error.message)
    throw error
  }
}

export const postPreferInfo = async (preferInfo: PreferInfoData) => {
  try {
    const response = await api.post('/users/prefer-info', preferInfo)
    return response.data
  } catch (error: any) {
    console.error('Error posting prefer info:', error.message)
    throw error
  }
}
