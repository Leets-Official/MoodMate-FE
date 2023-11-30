import api from './axios'

interface UserInfoData {
  nickname: string
  gender: '남' | '여'
  age: number
  department: string
  keywords: string[]
}

interface PreferInfoData {
  ageMin: number
  ageMax: number
  departmentPossible: boolean
  mood: string
}

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
