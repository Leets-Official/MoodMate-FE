import api from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface PostLoginProps {
  code: string | null
}
interface TokenResponse {
  accessToken: string
  refreshToken: string
}
const usePostLogin = () => {
  const postLogin = async (
    code: PostLoginProps,
  ): Promise<AxiosResponse<TokenResponse>> => {
    return await api.post<TokenResponse>('백엔드주소', null, {
      params: code,
    })
  }

  return useMutation({
    mutationFn: postLogin,
  })
}
export default usePostLogin
