import api from './apiConfig'

export const getAllEvents = async () => {
    const response = await api.get('/post/')
    return response.data
}

export const getEvent = async () => {
    const response = await api.get('/post/')
    return response.data
}