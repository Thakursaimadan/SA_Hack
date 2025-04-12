import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import EmployerDashboard from './pages/EmployerDashboard.jsx'
import ApplicantDashboard from './pages/ApplicantDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import CreateInternship from './pages/CreateInternship.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import InternshipDetailsPage from './pages/InternshipDetailsPage.jsx'
import ApplicationForm from './components/ApplicationForm.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Employer Routes */}
        <Route element={<PrivateRoute allowedRoles={['employer']} />}>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/create-internship" element={<CreateInternship />} />
        </Route>

        {/* Applicant Routes */}
        <Route element={<PrivateRoute allowedRoles={['applicant']} />}>
          <Route path="/applicant" element={<ApplicantDashboard />} />
          <Route path="/apply/:internshipId" element={<ApplicationForm />} />
        </Route>

        {/* Public Route */}
        <Route path="/internship/:id" element={<InternshipDetailsPage />} />
      </Routes>
    </>
  )
}