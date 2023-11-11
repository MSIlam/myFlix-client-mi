//
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import FavoriteMovies from "./favorite-movies";

// import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = () => {
  const [user, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });
  const [storedToken, setStoredToken] = useState(null);
  // const favoriteMovieList =
  //   user && user.FavouriteMovies
  //     ? movies.filter((movie) => user.FavouriteMovies.includes(movie._id))
  //     : [];
  // const removeFav = (movieId) => {
  //   // Implement the logic to remove the movie with the specified ID from the favorites
  //   const updatedFavorites = user.FavouriteMovies.filter(
  //     (id) => id !== movieId
  //   );

  // Update the user's data in local storage and state
  //   const updatedUser = { ...user, FavouriteMovies: updatedFavorites };
  //   localStorage.setItem("user", JSON.stringify(updatedUser));
  //   setUserData(updatedUser);
  // };

  useEffect(() => {
    // Assuming you already have the user information available in the state or from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUserData(storedUser);
      setFormData({
        Username: storedUser.Username || "",
        Password: storedUser.Password || "",
        Email: storedUser.Email || "",
        Birthday: storedUser.Birthday || "",
      });
      setStoredToken(token);
    } else {
      console.error("User data not available");
    }
  }, []);

  // Format the birthday to "yyyy-MM-dd"
  const formattedBirthday = new Date(formData.Birthday).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Assuming the user ID available
    const userId = user._id;
    // Format the birthday to "yyyy-MM-dd"
    // const formattedBirthday = new Date(formData.Birthday).toISOString().split('T')[0];

    fetch(`https://myflix-mi-e89972ef7472.herokuapp.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        ...formData,
        Birthday: formattedBirthday,
      }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log("User updated:", updatedUser);
        // Assuming a function to update the user state
        // setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  const handleDelete = () => {
    const userId = user._id;
    console.log("Token:", storedToken);

    fetch(`https://myflix-mi-e89972ef7472.herokuapp.com/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`, // Use the token directly from props
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

  return (
    <div style={{ marginTop: "60px", padding: "20px" }}>
      {user ? (
        <div>
          <h2>{user.Username || "Username not available"}</h2>
          <p>Email: {user.Email || "Email not available"}</p>
          <p>Birthday: {user.Birthday || "Birthday not available"}</p>
          <div>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={formData.Username}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
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
            {console.log("User Data:", user)}
          </div>
        </div>
      ) : (
        <p>Error loading user data</p>
      )}
    </div>
  );
};
