// // UpdateUserForm.js
// import React, { useState } from "react";

// const UserUpdate = ({ user, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     Username: user.Username,
//     Password: user.Password,
//     Email: user.Email,
//     Birthday: user.Birthday,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add validation or additional logic as needed before updating
//     onUpdate(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input
//           type="text"
//           name="Username" // <-- Corrected to match state key
//           value={formData.Username}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input
//           type="password"
//           name="Password" // <-- Corrected to match state key
//           value={formData.Password}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input
//           type="email"
//           name="Email" // <-- Corrected to match state key
//           value={formData.Email}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Date of Birth:
//         <input
//           type="date"
//           name="Birthday" // <-- Corrected to match state key
//           value={formData.Birthday}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Update</button>
//     </form>
//   );
// };

// export default UserUpdate;
