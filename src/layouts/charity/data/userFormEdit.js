import React, { useState, useEffect } from "react";
// @mui material components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton"; // Sử dụng MDButton từ Material Dashboard
import PropTypes from "prop-types"; // Import PropTypes

function UserFormEdit({ onClose, onUpdateUser, user }) {
  // Sử dụng các giá trị từ đối tượng user để làm giá trị ban đầu
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      email,
      phoneNumber,
      firstName,
      lastName,
    };
    onUpdateUser(updatedUser); // Cập nhật người dùng
    onClose(); // Đóng form sau khi cập nhật
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
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
          Save Changes
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

// Xác định kiểu cho props
UserFormEdit.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose là một hàm bắt buộc
  onUpdateUser: PropTypes.func.isRequired, // onUpdateUser là một hàm bắt buộc
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default UserFormEdit;
