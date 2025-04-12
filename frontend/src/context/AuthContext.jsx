// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        setUser({
          _id: decoded._id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        })
      } catch (error) {
        console.error('Error decoding token:', error)
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/users/login', { email, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]))
      setUser({
        _id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      })
      return true
    } catch (error) {
      return false
    }
  }

  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post('/api/users/register', { name, email, password, role })
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}