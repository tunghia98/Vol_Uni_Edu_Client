import React, { useState } from "react";
// @mui material components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton"; // Sử dụng MDButton từ Material Dashboard
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
function UserFormAdd({ onClose, onAddUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      phoneNumber,
      firstName,
      lastName,
    };
    const response = await axios.post("http://localhost:8080/api/users", newUser);
    onAddUser(response.data); // Gọi hàm để thêm người dùng
    onClose(); // Đóng form sau khi thêm
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="text"
          fullWidth
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <MDButton onClick={onClose} color="secondary">
          Cancel
        </MDButton>
        <MDButton onClick={handleSubmit} color="primary">
          Add User
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

// Xác định kiểu cho props
UserFormAdd.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose là một hàm bắt buộc
  onAddUser: PropTypes.func.isRequired, // onAddUser là một hàm bắt buộc
};

export default UserFormAdd;
