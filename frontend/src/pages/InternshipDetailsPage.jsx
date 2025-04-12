import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios.js'
import ApplicationForm from '../components/ApplicationForm'

export default function InternshipDetailsPage() {
  const { id } = useParams()
  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await axios.get(`/api/internships/${id}`)
        setInternship(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchInternship()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!internship) return <p>Internship not found</p>

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{internship.title}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-600 mb-2">{internship.companyName}</p>
        <p className="text-gray-500 mb-4">{internship.location}</p>
        <p className="mb-8">{internship.description}</p>
        <ApplicationForm />
      </div>
    </div>
  )
}