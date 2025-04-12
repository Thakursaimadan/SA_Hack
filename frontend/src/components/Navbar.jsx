import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return <div className="bg-gray-800 p-4">Loading...</div>
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Internship Board</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Hello, {user.name}</span>
              {user.role === 'employer' && (
                <Link to="/create-internship" className="text-gray-300 hover:text-white">
                  Post Job
                </Link>
              )}
              <button 
                onClick={logout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}