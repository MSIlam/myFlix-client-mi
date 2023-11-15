import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NaviBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      className="bg-body-tertiary"
      expand="lg"
      fixed="top"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: "darkred", fontWeight: "bold" }}
        >
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav variant="pills" className="me-auto">
            {!user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/login" style={{ color: "white" }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: "white" }}>
                  Signup
                </Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/profile" style={{ color: "white" }}>
                  My Profile
                </Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} style={{ color: "white" }}>
                  Logout
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
              <Link to="/login" style={{ color: "white" }}>
                {" "}
                None{" "}
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
