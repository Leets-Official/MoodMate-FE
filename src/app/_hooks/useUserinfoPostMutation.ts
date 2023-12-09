import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { postUserData } from '../_service/userinfo'
import { useCallback } from 'react'

export const useUserinfoPostMutation = (): UseMutationResult<
  any[],
  unknown,
  { userInfo: UserInfoData; preferInfo: PreferInfoData },
  unknown
> => {
  const mutationFn = useCallback(
    ({
      userInfo,
      preferInfo,
    }: {
      userInfo: UserInfoData
      preferInfo: PreferInfoData
    }) => postUserData(userInfo, preferInfo),
    [],
  )
  const mutation = useMutation(mutationFn)
  return mutation
}
