import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentService.getMyCourses();
      setEnrollments(response.data.enrollments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">📚 My Courses</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : enrollments.length === 0 ? (
        <Alert variant="info">
          You haven't enrolled in any courses yet.{' '}
          <Link to="/courses">Browse courses</Link>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {enrollments.map((enrollment) => (
            <Col key={enrollment._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">
                      {enrollment.course.title}
                    </Card.Title>
                    <Badge bg={enrollment.status === 'completed' ? 'success' : 'primary'}>
                      {enrollment.status}
                    </Badge>
                  </div>
                  <p className="text-muted small">
                    By {enrollment.course.instructor?.name}
                  </p>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Progress</small>
                      <small>{enrollment.progress}%</small>
                    </div>
                    <ProgressBar
                      now={enrollment.progress}
                      variant={enrollment.progress === 100 ? 'success' : 'primary'}
                    />
                  </div>

                  <Link to={`/course/${enrollment.course._id}`}>
                    <span className="text-primary">Continue Learning →</span>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;