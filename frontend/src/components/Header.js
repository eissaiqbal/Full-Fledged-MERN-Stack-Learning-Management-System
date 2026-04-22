import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-5">
          Eissa's LMS Platform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/courses">
              Courses
            </Nav.Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin-dashboard">
                    Admin Dashboard
                  </Nav.Link>
                )}
                {user.role === 'instructor' && (
                  <Nav.Link as={Link} to="/instructor-dashboard">
                    Instructor Dashboard
                  </Nav.Link>
                )}
                {user.role === 'student' && (
                  <Nav.Link as={Link} to="/student-dashboard">
                    My Courses
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/profile">
                  {user.name}
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;