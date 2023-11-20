import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import "./navigation-bar.css";

export const NaviBar = ({ user, onLoggedOut, resetSearch, setSearchMovie }) => {
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
          style={{ color: "CadetBlue", fontWeight: "bold" }}
          onClick={resetSearch}
        >
          CineFlix
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
                <Nav.Link
                  as={Link}
                  to="/"
                  style={{ color: "white" }}
                  onClick={resetSearch}
                >
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} style={{ color: "white" }}>
                  Logout
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
          <Form>
            <FormControl
              type="text"
              placeholder="Search movies..."
              onChange={(e) => setSearchMovie(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
