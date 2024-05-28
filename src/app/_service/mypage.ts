import api from './axios'

export const myPageInfo = async () => {
  try {
    return await api.get('mypage').then((res) => res.data)
  } catch (error) {
    throw error
  }
}

export const postCheckNickname = async (nickname: string) => {
  try {
    const requestBody = {
      userNickname: nickname,
    }
    const response = await api.post('mypage/nickname/check', requestBody)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async () => {
  try {
    return await api.delete('users').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
