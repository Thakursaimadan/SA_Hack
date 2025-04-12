// pages/ApplicantDashboard.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import ApplicationCard from '../components/ApplicationCard.jsx'

export default function ApplicantDashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/api/applications/my')
        setApplications(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div className="space-y-4">
          {applications.map(application => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      )}
    </div>
  )
}