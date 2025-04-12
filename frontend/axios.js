// src/axios.js
import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // this skips proxy and talks directly to backend
  withCredentials: true,            // needed if you're using cookies or sessions
})

export default instance
