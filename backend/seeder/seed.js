require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();
    console.log('✓ Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@lms.com',
      password: 'admin123',
      role: 'admin',
      bio: 'System Administrator',
    });

    // Create instructor users
    const instructor1 = await User.create({
      name: 'Jane Smith',
      email: 'jane@lms.com',
      password: 'jane123',
      role: 'instructor',
      bio: 'Expert in Web Development',
    });

    const instructor2 = await User.create({
      name: 'John Johnson',
      email: 'john@lms.com',
      password: 'john123',
      role: 'instructor',
      bio: 'Data Science Specialist',
    });

    // Create student users
    const student1 = await User.create({
      name: 'Alice Williams',
      email: 'alice@lms.com',
      password: 'alice123',
      role: 'student',
    });

    const student2 = await User.create({
      name: 'Bob Brown',
      email: 'bob@lms.com',
      password: 'bob123',
      role: 'student',
    });

    const student3 = await User.create({
      name: 'Carol Davis',
      email: 'carol@lms.com',
      password: 'carol123',
      role: 'student',
    });

    console.log('✓ Created 6 users (1 admin, 2 instructors, 3 students)');

    // Create courses
    const course1 = await Course.create({
      title: 'React.js Fundamentals',
      description: 'Learn React.js from scratch. Master components, hooks, and state management.',
      instructor: instructor1._id,
      category: 'Web Development',
      price: 49.99,
      lessons: [
        {
          title: 'Introduction to React',
          description: 'Getting started with React basics',
          videoUrl: 'https://example.com/lesson1',
        },
        {
          title: 'Components & Props',
          description: 'Understanding React components',
          videoUrl: 'https://example.com/lesson2',
        },
        {
          title: 'Hooks & State',
          description: 'Managing state with hooks',
          videoUrl: 'https://example.com/lesson3',
        },
      ],
      rating: 4.8,
    });

    const course2 = await Course.create({
      title: 'Node.js & Express.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express.js',
      instructor: instructor1._id,
      category: 'Backend Development',
      price: 59.99,
      lessons: [
        {
          title: 'Express.js Basics',
          description: 'Setting up Express server',
          videoUrl: 'https://example.com/lesson1',
        },
        {
          title: 'Routing & Middleware',
          description: 'Handling routes and middleware',
          videoUrl: 'https://example.com/lesson2',
        },
      ],
      rating: 4.7,
    });

    const course3 = await Course.create({
      title: 'Python Data Science Essentials',
      description: 'Master data analysis, visualization, and machine learning with Python',
      instructor: instructor2._id,
      category: 'Data Science',
      price: 69.99,
      lessons: [
        {
          title: 'Python Basics',
          description: 'Python fundamentals',
          videoUrl: 'https://example.com/lesson1',
        },
        {
          title: 'Pandas & NumPy',
          description: 'Data manipulation libraries',
          videoUrl: 'https://example.com/lesson2',
        },
      ],
      rating: 4.9,
    });

    const course4 = await Course.create({
      title: 'MongoDB & NoSQL Databases',
      description: 'Learn MongoDB and NoSQL database design patterns',
      instructor: instructor1._id,
      category: 'Databases',
      price: 39.99,
      lessons: [
        {
          title: 'MongoDB Basics',
          description: 'Getting started with MongoDB',
          videoUrl: 'https://example.com/lesson1',
        },
      ],
      rating: 4.6,
    });

    console.log('✓ Created 4 courses');

    // Create enrollments
    await Enrollment.create({
      student: student1._id,
      course: course1._id,
      progress: 45,
      status: 'active',
    });

    await Enrollment.create({
      student: student1._id,
      course: course2._id,
      progress: 20,
      status: 'active',
    });

    await Enrollment.create({
      student: student2._id,
      course: course1._id,
      progress: 100,
      status: 'completed',
    });

    await Enrollment.create({
      student: student2._id,
      course: course3._id,
      progress: 60,
      status: 'active',
    });

    await Enrollment.create({
      student: student3._id,
      course: course2._id,
      progress: 30,
      status: 'active',
    });

    console.log('✓ Created 5 enrollments');

    console.log(`
    ╔════════════════════════════════════╗
    ║   ✓ Database Seeded Successfully!  ║
    ╚════════════════════════════════════╝
    
    Sample Users:
    - Admin: admin@lms.com / admin123
    - Instructor: jane@lms.com / jane123
    - Student: alice@lms.com / alice123
    `);

    process.exit(0);
  } catch (err) {
    console.error('✗ Seed Error:', err.message);
    process.exit(1);
  }
};

seedDatabase();