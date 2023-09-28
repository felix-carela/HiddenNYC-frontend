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

export const createEvent = async (userId, name, coordinates, description, imageURL, address) => {
    const response = await api.post('/event', {
        userId, name, coordinates, description, imageURL, address 
    })
    return response.data
}