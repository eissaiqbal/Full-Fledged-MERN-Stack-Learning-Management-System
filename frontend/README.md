# LMS Frontend - React

##  Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

##  Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm start
```

Application will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── CourseCard.js
│   └── ProtectedRoute.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Courses.js
│   ├── CourseDetail.js
│   ├── Login.js
│   ├── Register.js
│   ├── Profile.js
│   └── dashboards/
│       ├── StudentDashboard.js
│       ├── InstructorDashboard.js
│       └── AdminDashboard.js
├── routes/
│   └── AppRoutes.js
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── courseService.js
│   ├── enrollmentService.js
│   └── userService.js
├── App.js
└── index.js
```

##  Demo Credentials

- **Student**: alice@lms.com / alice123
- **Instructor**: jane@lms.com / jane123
- **Admin**: admin@lms.com / admin123

##  Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests

##  Dependencies

- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **bootstrap** - CSS framework
- **react-bootstrap** - Bootstrap components for React

##  Deployment

See root README for deployment instructions on Netlify, Vercel, or Surge.