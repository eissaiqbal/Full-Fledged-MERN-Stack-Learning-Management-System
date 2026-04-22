# MERN Learning Management System (LMS)

A comprehensive, production-level Learning Management System built with MERN Stack (MongoDB, Express, React, Node.js).

## Features

### User Roles
- **Admin**: System management, analytics, user management
- **Instructor**: Create/manage courses, upload lessons
- **Student**: Enroll in courses, track progress

### Core Features
- User authentication & authorization (JWT)
- Role-based access control
- Course management (CRUD)
- Course enrollment system
- Progress tracking
- System analytics & reports
- Responsive UI with Bootstrap
- Secure password hashing (bcrypt)

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Logging**: Morgan
- **CORS**: Enabled

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **State Management**: React Context API

## Project Structure

```
mern-lms/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roles.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   ��   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   └── users.js
│   ├── seeder/
│   │   └── seed.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
└── README.md
```

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB Atlas account
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_uri" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "NODE_ENV=development" >> .env
echo "PORT=5000" >> .env

# Seed sample data
npm run seed

# Start server
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start app
npm start
```

App runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Instructor)
- `PUT /api/courses/:id` - Update course (Instructor)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/analytics` - Get system analytics

### Enrollments (Student)
- `POST /api/enroll` - Enroll in course
- `GET /api/enroll/my-courses` - Get my courses
- `GET /api/enroll/:enrollmentId` - Get enrollment details
- `PUT /api/enroll/:enrollmentId` - Update progress

## Demo Credentials

```
Admin:
Email: admin@lms.com
Password: admin123

Instructor:
Email: jane@lms.com
Password: jane123

Student:
Email: alice@lms.com
Password: alice123
```

## Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Create Render account
3. Create new Web Service from GitHub repo
4. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy

### Frontend Deployment (Netlify)

1. Build React app: `npm run build`
2. Connect GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy

### Database (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGO_URI` in backend .env

## Key Features Explained

### Authentication Flow
1. User registers/logs in
2. JWT token generated and stored in localStorage
3. Token sent in Authorization header for protected routes
4. Backend verifies token and grants access

### Role-Based Authorization
- **Admin**: Can manage all users and courses
- **Instructor**: Can create/manage their own courses
- **Student**: Can enroll and view their courses

### Progress Tracking
- Track completed lessons
- Update course progress percentage
- View enrollment status (active, completed, paused)

##  Development

### Code Structure Best Practices
- MVC pattern for backend
- Separation of concerns
- Reusable components
- Context API for state management
- Axios interceptors for API calls

### Error Handling
- Try-catch blocks in controllers
- Validation middleware
- Proper HTTP status codes
- Meaningful error messages

### Security
- JWT for authentication
- Bcrypt for password hashing
- Role-based authorization
- Environment variables for secrets
- CORS enabled for frontend

## caling Considerations

For production-level applications, consider:
- Add email verification
- Implement password reset
- Add payment integration
- Implement search & filtering
- Add video hosting (AWS S3, Cloudinary)
- Implement caching (Redis)
- Add rate limiting
- Implement logging (Winston)
- Add CI/CD pipeline
- Database indexing

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the Muhammad Eissa Iqbal

## 📧 Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- MERN Stack Documentation
- MongoDB
- React Community
- Bootstrap
