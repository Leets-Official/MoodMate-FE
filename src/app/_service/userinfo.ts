import api from './axios'

export const postUserData = async (
  userInfo: UserInfoData,
  preferInfo: PreferInfoData,
) => {
  try {
    let userInfoResult
    let preferInfoResult

    try {
      userInfoResult = await postUserInfo(userInfo)
      preferInfoResult = await postPreferInfo(preferInfo)
    } catch (error) {
      throw error
    }

    return { userInfoResult, preferInfoResult }
  } catch (error) {
    throw error
  }
}

export const postEditUserData = async (editUserInfo: EditUserInfoData) => {
  try {
    let editUserInfoResult

    try {
      editUserInfoResult = await putEditUserInfo(editUserInfo)
    } catch (error) {
      throw error
    }

    return { editUserInfoResult }
  } catch (error) {
    throw error
  }
}

const putEditUserInfo = async (editUserInfo: EditUserInfoData) => {
  try {
    const response = await api.put('/mypage', editUserInfo)
    return response.data
  } catch (error) {
    throw error
  }
}

const postUserInfo = async (userInfo: UserInfoData) => {
  try {
    const response = await api.post('users/user-info', userInfo)
    return response.data
  } catch (error) {
    throw error
  }
}

const postPreferInfo = async (preferInfo: PreferInfoData) => {
  try {
    const response = await api.post('users/prefer-info', preferInfo)
    return response.data
  } catch (error) {
    throw error
  }
}
