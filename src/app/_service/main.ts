import api from './axios'

/** 메인페이지 내용 가져오기 */
export const mainInfo = async () => {
  try {
    return await api.get('/users/main').then((res) => res.data)
  } catch (error) {
    throw error
  }
}

/** 매칭 비활성화 */
export const patchInactiveMain = async () => {
  try {
    return await api.patch('/users/match').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
