import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col md={8} className="mx-auto">
          <h1 className="mb-4">About Eissa's LMS Platform</h1>
          <p className="lead">
            LMS Platform is a comprehensive learning management system designed to connect
            educators and students in a modern, interactive environment.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <h3>Our Mission</h3>
          <p>
            To make quality education accessible to everyone, everywhere. We believe that
            learning should be flexible, affordable, and tailored to individual needs.
          </p>
        </Col>
        <Col md={6}>
          <h3>Our Vision</h3>
          <p>
            To become the leading platform where educators and learners connect to create
            meaningful educational experiences that transform lives.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mx-auto">
          <h3 className="mb-4">Our Features</h3>
          <ul className="list-group">
            <li className="list-group-item">✓ Comprehensive course library</li>
            <li className="list-group-item">✓ Interactive learning experience</li>
            <li className="list-group-item">✓ Progress tracking and analytics</li>
            <li className="list-group-item">✓ Expert instructors</li>
            <li className="list-group-item">✓ Flexible learning schedules</li>
            <li className="list-group-item">✓ Affordable pricing</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;