import { Link } from 'react-router-dom'

export default function ApplicationCard({ application }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {application.applicantId?.name || 'Applicant'}
          </h3>
          <p className="text-gray-600 text-sm">
            {application.applicantId?.email || 'No email provided'}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Applied on {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        </div>
        
        <a 
          href={application.resumeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm whitespace-nowrap"
        >
          View Resume
        </a>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700">Cover Letter:</h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {application.coverLetter}
        </p>
        <Link 
          to={`/application/${application._id}`} 
          className="text-blue-600 hover:underline text-sm inline-block mt-2"
        >
          Read full application
        </Link>
      </div>

      {application.status && (
        <div className={`mt-3 inline-block px-2 py-1 rounded-full text-xs ${
          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </div>
      )}
    </div>
  )
}