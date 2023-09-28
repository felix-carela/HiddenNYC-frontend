import api from './apiConfig'

export const getAllEvents = async () => {
    try {
      const response = await api.get('/event');
      console.log('receiving data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

export const createEvent = async (userId, name, coordinates, description, imageUrl, address) => {
    const response = await api.post('/event', {
        userId, name, coordinates, description, imageUrl, address 
    })
    return response.data
}

export const deleteEvent = async (eventId, userId) =>{

  const response = await api.delete(`/event/${eventId}`)
  return response.data
}

export const updateEvent = async (eventId, name, address, imageUrl, details ) => {
  console.log(eventId)
  const response = await api.put(`/event/${eventId}`, name, address, imageUrl, details)
  return response.data
}