import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // to prevent the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };
    fetch("https://myflix-mi-e89972ef7472.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <p style={{ marginBottom: "0", fontSize: "20px" }}> Welcome to</p>
        <h1 style={{ marginTop: "0", fontSize: "60px", fontWeight: "bold" }}>
          cineFlix
        </h1>
      </div>
      <Form
        onSubmit={handleSubmit}
        style={{
          marginTop: "30px",
          marginBottom: "200px",
          fontSize: "20px",
          padding: "10px",
          maxWidth: "500px",
        }}
      >
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ml-auto"
          style={{ marginTop: "10px" }}
        >
          Login
        </Button>
        <div>
          <Link to={`/signup`}>Not registered?</Link>
        </div>
      </Form>
    </React.Fragment>
  );
};
