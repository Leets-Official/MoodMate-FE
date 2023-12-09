import api from './axios'

export const postUserInfo = async (userInfo: UserInfoData): Promise<any> => {
  try {
    const response = await api.post('/users/user-info', userInfo)
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
    const response = await api.post('/users/prefer-info', preferInfo)
    return response.data
  } catch (error) {
    console.error('Error posting prefer info:', error)
    throw error
  }
}

export const postUserData = async (
  userInfo: UserInfoData,
  preferInfo: PreferInfoData,
): Promise<any[]> => {
  try {
    const [userInfoResult, preferInfoResult] = await Promise.allSettled([
      postUserInfo(userInfo),
      postPreferInfo(preferInfo),
    ])

    return [userInfoResult, preferInfoResult]
  } catch (error) {
    console.error('Error posting user or prefer info:', error)
    throw error
  }
}
