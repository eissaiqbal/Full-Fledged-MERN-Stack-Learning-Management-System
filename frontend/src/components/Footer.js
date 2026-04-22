import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 footer-custom">
      <Container>
        <Row className="py-5">
          <Col md={3} className="mb-4">
            <h5>Eissa's LMS Platform</h5>
            <p className="small">Your gateway to knowledge and skill development.</p>
          </Col>
          <Col md={3} className="mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h6>Support</h6>
            <ul className="list-unstyled small">
              <li><a href="mailto:support@lms.com">Email Support</a></li>
              <li><button className="btn-link" onClick={() => window.scrollTo(0, 0)}>Contact Us</button></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h6>Follow Us</h6>
            <ul className="list-unstyled small">
              <li><a href="https://facebook.com" rel="noopener noreferrer" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com" rel="noopener noreferrer" target="_blank">Twitter</a></li>
              <li><a href="https://linkedin.com" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col className="text-center small text-muted">
            <p>&copy; 2026 LMS Platform. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;