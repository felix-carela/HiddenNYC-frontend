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
  console.log('make a delete request to the backend' )
  
  // console.log("eventId: ", eventId)
  // console.log("userId: ", userId)
  // const tempObj = {
  //   "eventId":eventId, 
  //   "userId":userId
  // }
  // console.log("tempObj: ", tempObj)
  const response = await api.delete(`/event/${eventId}`)
  return response.data
}

