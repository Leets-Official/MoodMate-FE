import api from './axios'

/** 메인페이지 내용 가져오기 */
export const mainInfo = async (
  userId: number,
  userGender: string,
  userMatchActive: boolean,
  roomId: number,
  roomActive: boolean,
) => {
  try {
    return await api
      .get('/users/main', {
        params: {
          userId: userId.toString(),
          userGender: userGender.toString(),
          userMatchActive: userMatchActive.toString(),
          roomId: roomId.toString(),
          roomActive: roomActive.toString(),
        },
      })
      .then((res) => res.data)
  } catch (e: any) {
    console.log('메인페이지 api 가져오기 : ', e.message)
    throw e
  }
}
