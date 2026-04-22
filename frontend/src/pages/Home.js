import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Eissa's LMS Platform
              </h1>
              <p className="lead mb-4">
                Access quality education from anywhere. Learn from expert instructors and grow your skills at your own pace.
              </p>
              <div className="d-flex gap-3">
                <Link to="/courses">
                  <Button size="lg" variant="primary">
                    Browse Courses
                  </Button>
                </Link>
                {!user && (
                  <Link to="/register">
                    <Button size="lg" variant="outline-primary">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="hero-image">
                <h2>EISSA IQBAL</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Why Choose LMS Platform?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon">📖</div>
                <h5>Comprehensive Courses</h5>
                <p>Explore a wide range of courses in various domains.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon">🎯</div>
                <h5>Learn at Your Pace</h5>
                <p>Study whenever you want, wherever you want.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon">👨‍🏫</div>
                <h5>Expert Instructors</h5>
                <p>Learn from industry professionals and experts.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Start Learning?</h2>
          <p className="lead mb-4">
            Join thousands of students learning on LMS Platform today.
          </p>
          <Link to="/courses">
            <Button size="lg" variant="primary">
              Explore Courses Now
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
};

export default Home;