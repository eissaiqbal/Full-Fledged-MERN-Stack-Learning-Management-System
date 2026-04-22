import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

useEffect(() => {
  fetchCourse();
  checkEnrollment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCourseById(id);
      setCourse(response.data.course);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user || user.role !== 'student') return;
    try {
      const response = await enrollmentService.getMyCourses();
      const enrolled = response.data.enrollments.some(e => e.course._id === id);
      setIsEnrolled(enrolled);
    } catch (err) {
      // Enrollment check failed, continue
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);
      await enrollmentService.enrollCourse(id);
      setSuccess('Successfully enrolled in course!');
      setIsEnrolled(true);
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Course not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={8}>
          <h1 className="mb-3">{course.title}</h1>
          <p className="lead text-muted">
            By {course.instructor?.name || 'Unknown Instructor'}
          </p>

          <div className="mb-4">
            <Badge bg="primary" className="me-2">
              {course.category}
            </Badge>
            <span className="text-warning">★ {course.rating || 0}</span>
            <span className="text-muted ms-2">
              ({course.enrollmentCount || 0} students enrolled)
            </span>
          </div>

          <h3 className="mt-5 mb-3">Course Description</h3>
          <p>{course.description}</p>

          <h3 className="mt-5 mb-3">Course Lessons</h3>
          <div className="list-group">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, idx) => (
                <div key={idx} className="list-group-item">
                  <h6>{idx + 1}. {lesson.title}</h6>
                  <p className="text-muted small mb-0">{lesson.description}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No lessons available yet</p>
            )}
          </div>
        </Col>

        <Col md={4}>
          <div className="card shadow-sm position-sticky" style={{ top: '20px' }}>
            <div className="card-body">
              <h3 className="card-title">
                {course.price === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  <span>${course.price}</span>
                )}
              </h3>

              {user ? (
                <>
                  {user.role === 'student' && !isEnrolled && (
                    <Button
                      className="w-100 mb-2"
                      variant="primary"
                      size="lg"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  )}
                  {isEnrolled && (
                    <Button className="w-100 mb-2" variant="success" disabled>
                      ✓ Already Enrolled
                    </Button>
                  )}
                  {(user.role === 'instructor' || user.role === 'admin') && (
                    <Button className="w-100 mb-2" variant="secondary" disabled>
                      View as Instructor
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  className="w-100 mb-2"
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In to Enroll
                </Button>
              )}

              <div className="mt-4">
                <h6>Course Info</h6>
                <p className="text-muted small mb-1">
                  📚 {course.lessons?.length || 0} Lessons
                </p>
                <p className="text-muted small mb-1">
                  👥 {course.enrollmentCount || 0} Students
                </p>
                <p className="text-muted small">
                  ⭐ {course.rating || 0} Rating
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;