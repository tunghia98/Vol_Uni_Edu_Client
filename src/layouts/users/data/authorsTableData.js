/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function data() {
  const [rows, setRows] = useState([]);
  const User = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Username = ({ username }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {username}
      </MDTypography>
    </MDBox>
  );
  const Phone = ({ phone }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {phone}
      </MDTypography>
    </MDBox>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        const data = response.data.map((user) => ({
          user: <User name={`${user.firstName} ${user.lastName}`} email={user.email} />,
          username: <Username username={user.username} />,
          phone: <Phone phone={user.phoneNumber} />,
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={user.enabled ? "enable" : "disable"}
                color={user.enabled ? "success" : "error"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          created: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </MDTypography>
          ),
          action: <MDBox></MDBox>,
        }));
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "User", accessor: "user", width: "30%", align: "left" },
      { Header: "Username", accessor: "username", align: "left" },
      { Header: "Phone", accessor: "phone", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Created", accessor: "created", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
