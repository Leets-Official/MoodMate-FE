import api from './axios'

export const getMessages = async (
  roomId: number,
  size: number,
  page: number,
) => {
  try {
    return await api
      .get('/chat', {
        params: {
          roomId: roomId.toString(),
          size: size.toString(),
          page: page.toString(),
        },
      })
      .then((res) => res.data)
  } catch (error) {
    throw error
  }
}

export const patchQuitChat = async () => {
  try {
    return await api.patch('/chat').then((res) => res.data)
  } catch (error) {
    throw error
  }
}

// export const saveSubscription = async (subscription) => {
//   try {
//   } catch (error) {}
// }
