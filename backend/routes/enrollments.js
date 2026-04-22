const express = require('express');
const {
  enrollCourse,
  getMyCourses,
  getEnrollment,
  updateEnrollmentProgress,
  getCourseEnrollments,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();

router.post('/', protect, authorize('student'), enrollCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.get('/:enrollmentId', protect, getEnrollment);
router.put('/:enrollmentId', protect, updateEnrollmentProgress);
router.get('/course/:courseId', protect, authorize('instructor', 'admin'), getCourseEnrollments);

module.exports = router;