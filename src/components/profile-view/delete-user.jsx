// export const deleteUser = (userId, token) => {
//   const url = `https://myflix-mi-e89972ef7472.herokuapp.com/users/${userId}`;

//   return fetch(url, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("User deleted successfully");
//         // You might want to handle additional logic here after successful deletion
//       } else {
//         // Handle the error response
//         console.error("Failed to delete user account:", response.statusText);
//         throw new Error("Failed to delete user account");
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting user account:", error.message);
//       throw error;
//     });
// };
