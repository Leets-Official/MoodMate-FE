import api from './axios'

export const myPageInfo = async () => {
  try {
    return await api.get('/mypage').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
