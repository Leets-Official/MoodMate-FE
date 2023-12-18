import { useRouter } from 'next/navigation'
import api from './axios'

export const postUserData = async (
  userInfo: UserInfoData,
  preferInfo: PreferInfoData,
) => {
  // Check if any required field in userInfo is missing
  if (
    !userInfo.nickname ||
    !userInfo.gender ||
    !userInfo.year ||
    !userInfo.department ||
    !userInfo.keywords
  ) {
    throw new Error('Please fill in all required fields in user info.')
  }

  // Check if any required field in preferInfo is missing
  if (
    !preferInfo.preferYearMin ||
    !preferInfo.preferYearMax ||
    preferInfo.preferMood === undefined
  ) {
    throw new Error('Please fill in all required fields in preference info.')
  }

  const router = useRouter()

  try {
    const [userInfoResult, preferInfoResult] = await Promise.allSettled([
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      postUserInfo(userInfo),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      postPreferInfo(preferInfo),
    ])

    // return [userInfoResult, preferInfoResult]; // 주석 처리

    return { userInfoResult, preferInfoResult } // 함수 반환
  } catch (error: any) {
    if (error) {
      if (error.message?.includes('required fields')) {
        alert('필수 항목을 모두 입력해주세요.')
        router.push('/login')
      }
    }
  }
}

const postUserInfo = async (userInfo: UserInfoData) => {
  try {
    const response = await api.post('/users/user-info', userInfo)
    return response.data
  } catch (error) {
    throw error
  }
}

const postPreferInfo = async (preferInfo: PreferInfoData) => {
  try {
    const response = await api.post('/users/prefer-info', preferInfo)
    return response.data
  } catch (error) {
    throw error
  }
}
