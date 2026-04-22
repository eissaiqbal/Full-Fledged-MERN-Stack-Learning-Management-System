import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import courseService from '../../services/courseService';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  fetchInstructorCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchInstructorCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCoursesByInstructor(user._id);
      setCourses(response.data.courses);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>👨‍🏫 My Courses</h1>
        <Link to="/instructor/create-course">
          <Button variant="primary">+ Create Course</Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : courses.length === 0 ? (
        <Alert variant="info">
          You haven't created any courses yet.{' '}
          <Link to="/instructor/create-course">Create one now</Link>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course) => (
            <Col key={course._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Badge bg="secondary" className="mb-2">
                    {course.category}
                  </Badge>
                  <p className="text-muted small mb-3">
                    {course.description.substring(0, 80)}...
                  </p>

                  <div className="mb-3 small">
                    <p className="mb-1">
                      👥 {course.enrollmentCount || 0} students enrolled
                    </p>
                    <p className="mb-1">
                      📚 {course.lessons?.length || 0} lessons
                    </p>
                    <p className="mb-0">
                      💰 ${course.price || 0}
                    </p>
                  </div>

                  <div className="d-grid gap-2">
                    <Link to={`/instructor/manage-courses?id=${course._id}`}>
                      <Button variant="outline-primary" size="sm" className="w-100">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default InstructorDashboard;