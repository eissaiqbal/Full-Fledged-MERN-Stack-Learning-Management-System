const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc Enroll a student in a course
// @route POST /api/enroll
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide courseId',
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already enrolled
    let enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (enrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course',
      });
    }

    // Create enrollment
    enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
    });

    // Increment enrollment count
    course.enrollmentCount += 1;
    await course.save();

    res.status(201).json({
      success: true,
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Get my enrolled courses
// @route GET /api/enroll/my-courses
exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'name email profilePicture',
        },
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Get enrollment details
// @route GET /api/enroll/:enrollmentId
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId)
      .populate('student', 'name email')
      .populate('course');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    res.status(200).json({
      success: true,
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Update enrollment progress
// @route PUT /api/enroll/:enrollmentId
exports.updateEnrollmentProgress = async (req, res) => {
  try {
    const { progress, completedLessons, status } = req.body;

    let enrollment = await Enrollment.findById(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    // Check authorization
    if (enrollment.student.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this enrollment',
      });
    }

    enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { progress, completedLessons, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Get course enrollments (Instructor/Admin)
// @route GET /api/enroll/course/:courseId
exports.getCourseEnrollments = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check authorization
    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view enrollments for this course',
      });
    }

    const enrollments = await Enrollment.find({ course: req.params.courseId })
      .populate('student', 'name email');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};