import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    fetch("https://myflix-mi-e89972ef7472.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup sussessful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
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
          marginBottom: "90px",
          padding: "10px",
          fontSize: "20px",
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
            minLength="4"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Link to={`/login`}>
          <Button type="submit" style={{ marginTop: "10px" }}>
            Signup
          </Button>
        </Link>
      </Form>
    </React.Fragment>
  );
};
