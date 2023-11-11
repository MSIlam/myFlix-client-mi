import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NaviBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="bg-body-tertiary" expand="xxl" bg="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
          <Navbar.Text>
            Signed in as:
            {user ? (
              <span>
                <strong>{user.Username}</strong>
              </span>
            ) : (
              <Link to="/login"> Not Yet</Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
