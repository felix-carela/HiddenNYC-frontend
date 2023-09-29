import axios from 'axios'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

//make based on evironment set API url
const API_URL = process.env.REACT_APP_DATABASE_URL;


// Create a re-useable axios object, with our API as the baseURL
const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  config.headers.Authorization = token
  return config
})

export default api