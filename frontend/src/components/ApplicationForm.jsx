import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ApplicationForm() {
  const { internshipId } = useParams()
  const [formData, setFormData] = useState({
    resumeLink: '',
    coverLetter: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/applications/${internshipId}`, formData)
      navigate('/applicant')
    } catch (error) {
      console.error('Application failed:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Apply for Internship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Resume Link</label>
          <input
            type="url"
            required
            className="w-full p-2 border rounded"
            value={formData.resumeLink}
            onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Cover Letter</label>
          <textarea
            required
            className="w-full p-2 border rounded h-32"
            value={formData.coverLetter}
            onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}