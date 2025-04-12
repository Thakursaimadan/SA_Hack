// src/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://sa-hack.vercel.app/', // this skips proxy and talks directly to backend
  withCredentials: true,            // needed if you're using cookies or sessions
})

export default instance
