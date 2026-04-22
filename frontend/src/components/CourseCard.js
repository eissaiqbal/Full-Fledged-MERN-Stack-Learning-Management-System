import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, onEnroll }) => {
  return (
    <Card className="course-card h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{course.title}</Card.Title>
          <span className="badge bg-primary">{course.category}</span>
        </div>
        
        <p className="text-muted small mb-2">
          By {course.instructor?.name || 'Unknown'}
        </p>
        
        <Card.Text className="course-description">
          {course.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-warning">★ {course.rating || 0}</span>
            <span className="text-muted small ms-2">
              ({course.enrollmentCount || 0} enrolled)
            </span>
          </div>
          <h5 className="mb-0">
            {course.price === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              <span>${course.price}</span>
            )}
          </h5>
        </div>
        
        <div className="d-grid gap-2">
          <Link to={`/course/${course._id}`}>
            <Button variant="outline-primary" className="w-100">
              View Details
            </Button>
          </Link>
          {onEnroll && (
            <Button variant="primary" onClick={() => onEnroll(course._id)}>
              Enroll Now
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;