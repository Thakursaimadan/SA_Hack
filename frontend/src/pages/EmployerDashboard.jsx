import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('/api/internships', {
          params: { employerId: user._id }
        })
        setInternships(res.data)
      } catch (error) {
        console.error('Error fetching internships:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (user) fetchInternships()
  }, [user])

  const fetchApplications = async (internshipId) => {
    try {
      const res = await axios.get(`/api/applications/for/${internshipId}`)
      setApplications(res.data)
      setSelectedInternship(internshipId)
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Posted Internships</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : internships.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't posted any internships yet</p>
          <Link 
            to="/create-internship" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Your First Internship
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Internships List */}
          <div className="md:col-span-1 space-y-4">
            {internships.map(internship => (
              <div 
                key={internship._id} 
                className={`p-4 border rounded cursor-pointer ${selectedInternship === internship._id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                onClick={() => fetchApplications(internship._id)}
              >
                <h3 className="font-semibold">{internship.title}</h3>
                <p className="text-sm text-gray-600">{internship.companyName}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Posted on {formatDate(internship.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Applications Panel */}
          <div className="md:col-span-2">
            {selectedInternship ? (
              applications.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Applications</h2>
                  <div className="space-y-4">
                    {applications.map(application => (
                      <div key={application._id} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{application.applicantId.name}</h3>
                            <p className="text-sm text-gray-600">{application.applicantId.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Applied on {formatDate(application.appliedAt)}
                            </p>
                          </div>
                          <a 
                            href={application.resumeLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Resume
                          </a>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-1">Cover Letter:</h4>
                          <p className="text-sm text-gray-700">{application.coverLetter}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No applications received yet</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Select an internship to view applications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}