const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc Get all courses
// @route GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name email profilePicture')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Get single course by ID
// @route GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'instructor',
      'name email profilePicture bio'
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Create a course (Instructor only)
// @route POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, price, lessons } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and category',
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price: price || 0,
      lessons: lessons || [],
      instructor: req.user.id,
    });

    res.status(201).json({
      success: true,
      course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Update a course
// @route PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if user is instructor of the course or admin
    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course',
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Delete a course
// @route DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

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
        message: 'Not authorized to delete this course',
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    // Remove all enrollments for this course
    await Enrollment.deleteMany({ course: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc Get courses by instructor
// @route GET /api/courses/instructor/:instructorId
exports.getCoursesByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.instructorId });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};