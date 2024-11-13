/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDProgress from "components/MDProgress";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function charityTableData() {
  const [rows, setRows] = useState([]);

  // Component to display the project title
  const Charity = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // Component to display completion progress
  const CompletionProgress = ({ currentAmount, targetAmount }) => {
    const completionPercentage = ((currentAmount / targetAmount) * 100).toFixed(2);
    const progressColor = currentAmount >= targetAmount ? "success" : "info";

    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {completionPercentage}%
        </MDTypography>
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color={progressColor} value={completionPercentage} />
        </MDBox>
      </MDBox>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/charities");
        const charities = response.data;

        const charityRows = charities.map((charity) => ({
          charity: <Charity name={charity.title} />,
          budget: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {charity.targetAmount.toLocaleString()} VND
            </MDTypography>
          ),
          status: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {charity.status}
            </MDTypography>
          ),
          completion: (
            <CompletionProgress
              currentAmount={charity.currentAmount}
              targetAmount={charity.targetAmount}
            />
          ),
          created: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {new Date(charity.createdAt).toLocaleDateString()}
            </MDTypography>
          ),
          action: (
            <MDBox>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                onClick={() => handleEditCharity(charity.id)}
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
                onClick={() => handleDeleteCharity(charity.id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Delete
              </MDTypography>
            </MDBox>
          ),
        }));

        setRows(charityRows);
      } catch (error) {
        console.error("Error fetching charity data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Charity", accessor: "charity", width: "30%", align: "left" },
      { Header: "Budget", accessor: "budget", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Completion", accessor: "completion", align: "center" },
      { Header: "Created", accessor: "created", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
