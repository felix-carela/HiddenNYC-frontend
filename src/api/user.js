import api from './apiConfig'

export const createUser = async (googleUser, googleProfile) => {
    const response = await api.post('/user', {googleProfile})
    return response.data
}