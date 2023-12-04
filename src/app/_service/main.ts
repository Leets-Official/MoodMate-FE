import api from './axios'

/** 메인페이지 내용 가져오기 */
export const mainInfo = async () => {
  try {
    return await api.get('/users/main').then((res) => res.data)
  } catch (error) {
    console.log('메인페이지 api 가져오기 : ', error)
    throw error
  }
}

/** 매칭 비활성화 */
export const patchInactiveMain = async () => {
  try {
    return await api.patch('/users/match').then((res) => res.data)
  } catch (error) {
    console.log('매칭 비활성화 에러 : ', error)
    throw error
  }
}
