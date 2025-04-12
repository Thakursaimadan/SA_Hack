# SA_HACK

## Project Overview
SA_HACK is a full-stack web application designed to streamline the process of connecting employers with applicants for internships. The project is built using modern web technologies, including React for the frontend and Express.js for the backend. The application allows employers to post internships, and applicants to apply for them, creating a seamless experience for both parties.

## Live Demo
The frontend of the application is deployed and accessible at: [SA_HACK Frontend](https://sa-hack-nl9w.vercel.app/)

## Features

### Frontend
- **React**: The frontend is built using React, providing a dynamic and responsive user interface.
- **React Router**: For seamless navigation between pages.
- **Axios**: For making API requests to the backend.
- **Authentication**: Users can register and log in to access personalized features.
- **Role-Based Access**: Employers and applicants have different functionalities.
- **Pages**:
  - HomePage: Displays available internships.
  - LoginPage: Allows users to log in.
  - RegisterPage: Allows users to register.
  - EmployerDashboard: Employers can manage their internships.
  - ApplicantDashboard: Applicants can view their applications.
  - CreateInternship: Employers can create new internships.
  - InternshipDetailsPage: Displays detailed information about an internship.

### Backend
- **Express.js**: The backend is built using Express.js, providing RESTful APIs.
- **MongoDB**: A NoSQL database is used to store user, internship, and application data.
- **Mongoose**: For schema-based interaction with MongoDB.
- **Authentication**: JWT-based authentication to secure API endpoints.
- **Role-Based Middleware**: Ensures only authorized users can access specific routes.
- **APIs**:
  - `/api/users/`: Handles user registration and login.
  - `/api/internships/`: CRUD operations for internships.
  - `/api/applications/`: Allows applicants to apply for internships and employers to view applications.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SA_HACK
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - **Frontend**: Create a `.env.local` file in the `frontend` directory and add:
     ```env
     VITE_BACKEND_URL="http://localhost:5000"
     ```
   - **Backend**: Create a `.env` file in the `backend` directory and add:
     ```env
     PORT=5000
     MONGOURI=<your-mongodb-uri>
     FRONTEND_URL="http://localhost:5173"
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm start
     ```

5. Access the application:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

## Deployment

### Frontend
The frontend is deployed on Vercel. The deployment configuration is defined in `vercel.json`.

### Backend
The backend is also deployed on Vercel. The deployment configuration is defined in `vercel.json`.

## Technologies Used
- **Frontend**: React, Vite, Axios
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Deployment**: Vercel


