import { useState } from 'react'
import axios from '../../axios.js'
import { useNavigate } from 'react-router-dom'

export default function CreateInternship() {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    role: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/internships', formData)
      navigate('/employer')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Post New Internship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Company Name</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            required
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Role</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Post Internship
        </button>
      </form>
    </div>
  )
}
