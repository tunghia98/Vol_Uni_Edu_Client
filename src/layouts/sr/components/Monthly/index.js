import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import axios from "axios";
function Monthly() {
  const [donationData, setDonationData] = useState(null);
  const fetchMonthlyDonationData = async () => {
    try {
      const start = dayjs().subtract(6, "months").startOf("month").toISOString();
      const end = dayjs().endOf("month").toISOString();
      const response = await axios.get("http://localhost:8080/api/donations/monthly-totals", {
        params: { startDate: start, endDate: end },
      });
      setDonationData(response.data);
      console.log(response.data); // Dữ liệu trả về để kiểm tra
    } catch (error) {
      console.error("Error fetching monthly donation data:", error);
    }
  };
  useEffect(() => {
    fetchMonthlyDonationData();
  }, []);
  const monthlyUserChartData = {
    labels: donationData?.userMonthlyTotals?.map((item) => item.date), // Lấy tên/tháng làm nhãn
    datasets: {
      label: "User Donations",
      data: donationData?.userMonthlyTotals?.map((item) => parseFloat(item.totalAmount)),
    },
  };
  const monthlyGroupChartData = {
    labels: donationData?.groupMonthlyTotals?.map((item) => item.date),
    datasets: {
      label: "Group Donations",
      data: donationData?.groupMonthlyTotals?.map((item) => parseFloat(item.totalAmount)),
    },
  };
  return (
    <div>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="User Donations"
                description="Total donations by users over the last 7 months"
                date="Updated based on selected dates"
                chart={monthlyUserChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="success"
                title="Group Donations"
                description="Total donations by groups over the last 7 months"
                date="Updated based on selected dates"
                chart={monthlyGroupChartData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default Monthly;
