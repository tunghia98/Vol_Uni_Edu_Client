/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import React, { useState } from "react";
// Data
import authorsTableData from "layouts/users/data/authorsTableData";
import UserFormAdd from "./data/userFormAdd";
import UserFormEdit from "./data/userFormEdit";
import axios from "axios";
function Users() {
  const { columns, rows } = authorsTableData();
  const [openAddForm, setOpenAddForm] = useState(false); // State để quản lý popup
  const [openEditForm, setOpenEditForm] = useState(false); // State để quản lý popup chỉnh sửa người dùng
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpenAddForm = () => {
    setOpenAddForm(true); // Mở popup
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false); // Đóng popup
  };
  const handleOpenEditForm = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${username}`);
      const userData = {
        username: response.data.username,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        enabled: response.data.enabled,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      };
      setSelectedUser(userData);
      setOpenEditForm(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Hàm đóng popup chỉnh sửa người dùng
  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setSelectedUser(null);
  };
  const handleAddUser = (newUser) => {
    console.log("New User Added:", newUser);
    handleCloseAddForm();
  };
  const handleDelete = (user) => {
    alert(user);
  };
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Make an API call to update the user
      const response = await axios.put(
        `http://localhost:8080/api/users/${updatedUser.username}`,
        updatedUser
      );
      // Assuming the response contains the updated user data
      const updatedUserData = response.data;
      console.log("User Updated:", updatedUserData);
      handleCloseEditForm();
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally show an error message to the user
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex" // Sử dụng flexbox
                justifyContent="space-between" // Căn chỉnh khoảng cách giữa các phần tử
                alignItems="center" // Căn giữa theo chiều dọc
              >
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
                <MDButton variant="gradient" color="secondary" onClick={handleOpenAddForm}>
                  Add User
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: rows.map((user) => ({
                      ...user,
                      action: (
                        <MDBox>
                          <MDTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                            onClick={() => handleOpenEditForm(user.username.props.username)}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          >
                            Edit
                          </MDTypography>
                          <MDTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                            onClick={() => handleDelete(user.username)}
                            style={{ cursor: "pointer", color: "red" }}
                          >
                            Delete
                          </MDTypography>
                        </MDBox>
                      ),
                    })),
                  }}
                  canSearch={true}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {openAddForm && (
        <div>
          {/* Thêm component cho form thêm người dùng ở đây */}
          <UserFormAdd onClose={handleCloseAddForm} />
        </div>
      )}
      {openEditForm && selectedUser && (
        <div>
          <UserFormEdit
            onClose={handleCloseEditForm}
            onUpdateUser={handleUpdateUser}
            user={selectedUser}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Users;
