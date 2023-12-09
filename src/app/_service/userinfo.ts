import api from './axios'

export const postUserData = async (
  userInfo: UserInfoData,
  preferInfo: PreferInfoData,
) => {
  try {
    const [userInfoResult, preferInfoResult] = await Promise.allSettled([
      postUserInfo(userInfo),
      postPreferInfo(preferInfo),
    ])

    // return [userInfoResult, preferInfoResult]; // 주석 처리

    return () => ({ userInfoResult, preferInfoResult }) // 함수 반환
  } catch (error) {
    console.error('Error posting user or prefer info:', error)
    throw error
  }
}

const postUserInfo = async (userInfo: UserInfoData) => {
  try {
    const response = await api.post('/users/user-info', userInfo)
    return response.data
  } catch (error) {
    console.error('Error posting user info:', error)
    throw error
  }
}

const postPreferInfo = async (preferInfo: PreferInfoData) => {
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
