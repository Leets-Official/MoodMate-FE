import api from './axios'

export const mainInfo = async () => {
  try {
    return await api.get('/users/main').then((res) => res.data)
  } catch (error) {
    throw error
  }
}

export const patchInactiveMain = async () => {
  try {
    return await api.patch('/users/match').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
