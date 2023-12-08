import { useMutation } from 'react-query'
import { postUserInfo } from '../_service/userinfo'

const useUserinfoPostMutation = () => {
  const userinfoMutation = useMutation(postUserInfo, {
    onSuccess: (data) => {
      console.log('Userinfo post mutation success : ', data)
    },
    onError: (error) => {
      console.log('Userinfo post mutation error : ', error)
    },
  })
  return userinfoMutation
}

export default useUserinfoPostMutation
