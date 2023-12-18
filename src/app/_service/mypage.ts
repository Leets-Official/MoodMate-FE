import api from './axios'

/** 마이페이지 내용 가져오기 */
export const myPageInfo = async () => {
  try {
    return await api.get('/mypage').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
