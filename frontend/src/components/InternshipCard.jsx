// components/InternshipCard.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function InternshipCard({ internship }) {
  const { user } = useAuth()
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{internship.title}</h3>
      <p className="text-gray-600">{internship.companyName}</p>
      <p className="text-sm text-gray-500">{internship.location}</p>
      <p className="mt-2">{internship.description.slice(0, 100)}...</p>
      <div className="mt-4 flex justify-between items-center">
        <Link 
          to={`/internship/${internship._id}`} 
          className="text-blue-600 hover:underline"
        >
          View Details
        </Link>
        {user?.role === 'applicant' && (
          <Link 
            to={`/apply/${internship._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  )
}