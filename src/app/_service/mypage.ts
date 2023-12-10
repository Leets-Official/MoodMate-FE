import api from './axios'

/** 마이페이지 내용 가져오기 */
export const mypageInfo = async () => {
  try {
    return await api.get('/mypage').then((res) => res.data)
  } catch (error) {
    console.log('마이페이지 api 가져오기 : ', error)
    throw error
  }
}
