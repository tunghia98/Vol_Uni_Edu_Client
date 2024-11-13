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
import React, { useState, useEffect } from "react";
// Data
import charityTableData from "layouts/charity/data/charityTableData"; // Ensure this imports the correct data source
import axios from "axios";

function Charity() {
  const { columns, rows } = charityTableData();

  // Event handler for opening the edit form
  const handleOpenEditForm = (username) => {
    console.log(`Editing charity with username: ${username}`);
    // Your logic to open the edit form goes here
  };

  // Event handler for deleting a charity
  const handleDelete = (username) => {
    console.log(`Deleting charity with username: ${username}`);
    // Your logic to delete the charity goes here
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
                  Charities
                </MDTypography>
                <MDButton variant="gradient" color="secondary">
                  Add Charities
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: rows.map((charity) => ({
                      ...charity,
                      action: (
                        <MDBox>
                          <MDTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                            //onClick={() => handleOpenEditForm(charity.project.props.name)}
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
                            //onClick={() => handleDelete(charity.project.props.name)}
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
    </DashboardLayout>
  );
}

export default Charity;
