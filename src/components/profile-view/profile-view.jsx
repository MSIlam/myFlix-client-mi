import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";

export const ProfileView = ({ movies }) => {
  const [user, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });

  const [storedToken, setStoredToken] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUserData(storedUser);
      setFormData({
        Username: storedUser.Username || "",
        Password: storedUser.Password || "",
        Email: storedUser.Email || "",
        Birthday: new Date(storedUser.Birthday).toISOString().split("T")[0],
      });
      setStoredToken(token);
    } else {
      console.error("User data not available");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log("User updated:", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDelete = () => {
    fetch(`https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUserData(null);
          alert("Your account has been deleted");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // const removeFavorites = (movieId) => {
  //   fetch(
  //     `https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}/movies/${movieId}`,
  //     {
  //       method: "DELETE",
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     }
  //   )
  //     .then(() => {
  //       // Remove the movieId from the FavouriteMovies array in user state
  //       setUserData((prevUser) => {
  //         const updatedUser = { ...prevUser };
  //         updatedUser.FavouriteMovies = updatedUser.FavouriteMovies.filter(
  //           (id) => id !== movieId
  //         );
  //         return updatedUser;
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error removing movie from favorites:", error);
  //     });
  // };

  const removeFavorites = (movieId) => {
    fetch(
      `https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    )
      .then(() => {
        // Remove the movieId from the FavouriteMovies array in user state
        setUserData((prevUser) => {
          const updatedUser = { ...prevUser };
          updatedUser.FavouriteMovies = updatedUser.FavouriteMovies.filter(
            (id) => id !== movieId
          );

          // Update the user data in local storage
          localStorage.setItem("user", JSON.stringify(updatedUser));

          return updatedUser;
        });
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
      });
  };

  return (
    <Container>
      <Row style={{ marginTop: "30px", padding: "10px" }}>
        {user ? (
          <React.Fragment>
            <h2>{user.Username || "Username not available"}</h2>
            <p>Email: {user.Email || "Email not available"}</p>
            <p>Birthday: {user.Birthday || "Birthday not available"}</p>
          </React.Fragment>
        ) : (
          <p>Error loading user data</p>
        )}
      </Row>
      <Row>
        <h3>Favorite Movies</h3>
        {user && user.FavouriteMovies ? (
          user.FavouriteMovies.map((movieId) => {
            const movie = movies.find((m) => m.id === movieId);
            return (
              movie && (
                <Col key={movie.id} md={3}>
                  <Card className="h-100 shadow">
                    <Card.Img
                      variant="top"
                      src={movie.ImageURL}
                      style={{ width: "100%", height: "75%" }}
                    />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => removeFavorites(movieId)}
                        style={{ marginTop: "10px" }}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            );
          })
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
      <Row
        style={{
          marginTop: "30px",
          padding: "10px",
          backgroundColor: "LightCyan",
        }}
      >
        <h3>Update User Info</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group as={Row} className="mb-3" controlId="formUsername">
            <Form.Label column sm={2}>
              Username:
            </Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
          <Button onClick={handleDelete} variant="danger">
            Deregister
          </Button>
        </Form>
        {console.log("User Data:", user) && null}
      </Row>
    </Container>
  );
};
