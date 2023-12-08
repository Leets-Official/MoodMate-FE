import api from './axios'

export const postUserInfo = async (userInfo: UserInfoData): Promise<any> => {
  try {
    const response = await api.put('/users/user-info', userInfo)
    return response.data
  } catch (error) {
    console.error('Error posting user info:', error)
    throw error
  }
}

export const postPreferInfo = async (
  preferInfo: PreferInfoData,
): Promise<any> => {
  try {
    const response = await api.put('/users/prefer-info', preferInfo)
    return response.data
  } catch (error) {
    console.error('Error posting prefer info:', error)
    throw error
  }
}
