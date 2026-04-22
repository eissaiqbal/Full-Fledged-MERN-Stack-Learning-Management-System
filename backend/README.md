# LMS Backend - Node.js + Express + MongoDB

##  Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

##  Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/lms-db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
```

### 3. Seed Sample Data

```bash
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/analytics` - Get system analytics

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/instructor/:instructorId` - Get instructor's courses
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)

### Enrollments (Student only)
- `POST /api/enroll` - Enroll in a course
- `GET /api/enroll/my-courses` - Get enrolled courses
- `GET /api/enroll/:enrollmentId` - Get enrollment details
- `PUT /api/enroll/:enrollmentId` - Update progress

##  Roles & Permissions

- **Admin**: Full system access
- **Instructor**: Create/manage courses, view enrollments
- **Student**: Enroll in courses, track progress

##  Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   ├── enrollmentController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── roles.js
├── models/
│   ├── Course.js
│   ├── Enrollment.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── courses.js
│   ├── enrollments.js
│   └── users.js
├── seeder/
│   └── seed.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

##  Debugging

Enable detailed logs by setting `NODE_ENV=development` in `.env`

##  Deployment

See root README for deployment instructions on Render, Heroku, or DigitalOcean.