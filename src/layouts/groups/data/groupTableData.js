/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function GroupTableData() {
  const [rows, setRows] = useState([]);

  const Owner = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Campaign = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const Name = ({ name }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Bước 1: Lấy dữ liệu nhóm
        const response = await axios.get("http://localhost:8080/api/donation-groups");
        const data = response.data.map((group) => ({
          id: group.id,
          name: <Name name={group.groupName} />, // Thêm tên nhóm từ groupName
          owner: <Owner name={`${group.owner.firstName} ${group.owner.lastName}`} />, // Lấy tên từ owner
          charity: <Campaign title={group.campaign.title} />, // Lấy tiêu đề từ campaign
          status: (
            <MDBadge
              badgeContent={group.status}
              color={group.status === "active" ? "success" : "error"}
              variant="gradient"
              size="sm"
            />
          ),
          created: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {new Date(group.createdAt).toLocaleDateString()} {/* Chú ý đến trường createdAt */}
            </MDTypography>
          ),
          action: <MDBox>{/* Thêm nút hành động nếu cần */}</MDBox>,
        }));

        // Bước 2: Cập nhật dữ liệu bảng
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Name", accessor: "name", align: "left" }, // Cột tên
      { Header: "Owner", accessor: "owner", align: "left" },
      { Header: "Charity", accessor: "charity", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Created", accessor: "created", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
