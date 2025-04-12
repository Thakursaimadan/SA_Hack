// pages/HomePage.jsx
import { useEffect, useState } from 'react'
import axios from '../../axios.js'
import InternshipCard from '../components/InternshipCard'



export default function HomePage() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('/api/internships/')
        setInternships(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Available Internships</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {internships && internships.map(internship => (
            <InternshipCard key={internship._id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  )
}