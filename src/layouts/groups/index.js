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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import React, { useState, useEffect } from "react";
// Data
import groupTableData from "layouts/groups/data/groupTableData"; // Ensure this imports the correct data source
import axios from "axios";

function Groups() {
  const { columns, rows } = groupTableData();
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [openMembersModal, setOpenMembersModal] = useState(false);
  // Event handler for opening the edit form
  const handleOpenEditForm = (groupName) => {
    console.log(`Editing group: ${groupName}`);
    // Your logic to open the edit form goes here
  };

  // Event handler for deleting a group
  const handleDelete = (groupName) => {
    console.log(`Deleting group: ${groupName}`);
    // Your logic to delete the group goes here
  };
  const handleOpenMembers = async (groupId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/group-members/group/${groupId}`);
      console.log(response.data);
      setSelectedGroupMembers(response.data);
      setOpenMembersModal(true); // Open the modal to display group members
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };
  const handleCloseMembersModal = () => {
    setOpenMembersModal(false); // Close the modal
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
                  Groups
                </MDTypography>
                <MDButton variant="gradient" color="secondary">
                  Add Group
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: rows.map((group) => ({
                      ...group,
                      action: (
                        <MDBox>
                          <MDTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                            onClick={() => handleOpenMembers(group.id)} // Assuming group has a name property
                            style={{ marginRight: "10px", cursor: "pointer", color: "blue" }}
                          >
                            Members
                          </MDTypography>
                          <MDTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                            onClick={() => handleOpenEditForm(group.id)} // Assuming group has a name property
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
                            onClick={() => handleDelete(group.id)} // Assuming group has a name property
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
      {/* Modal for displaying group members */}
      <Dialog open={openMembersModal} onClose={handleCloseMembersModal}>
        <DialogTitle>Group Members</DialogTitle>
        <DialogContent>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {selectedGroupMembers.map((member) => (
              <MDBox key={member.id} component="li" display="flex" justifyContent="space-between">
                <MDTypography variant="body1">{member.name}</MDTypography>
                {/* You can add buttons for actions on each member if needed */}
              </MDBox>
            ))}
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseMembersModal} color="primary">
            Close
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Groups;
