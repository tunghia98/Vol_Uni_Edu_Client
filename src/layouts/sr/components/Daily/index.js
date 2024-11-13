import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import axios from "axios";
function Daily() {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [donationData, setDonationData] = useState(null);
  const fetchDonationData = async () => {
    try {
      const start = startDate.toISOString(); // Convert to ISO string
      const end = endDate.toISOString(); // Convert to ISO string
      const response = await axios.get("http://localhost:8080/api/donations/daily-totals", {
        params: { startDate: start, endDate: end },
      });
      setDonationData(response.data);
      console.log(response.data); // Store the fetched data
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };
  // Trigger data fetch when dates are updated
  useEffect(() => {
    fetchDonationData();
  }, [startDate, endDate]); // Only fetch data when the dates change

  // Prepare data for the charts
  const userChartData = {
    labels: donationData?.userDailyTotals?.map((item) => item.date), // Extract dates as labels
    datasets: {
      label: "User Donations", // You can change this label based on your needs
      data: donationData?.userDailyTotals?.map((item) => parseFloat(item.totalAmount)), // Extract values as data
    },
  };

  const groupChartData = {
    labels: donationData?.groupDailyTotals?.map((item) => item.date), // Extract dates as labels
    datasets: {
      label: "User Donations", // You can change this label based on your needs
      data: donationData?.groupDailyTotals?.map((item) => parseFloat(item.totalAmount)), // Extract values as data
    },
  };

  return (
    <div>
      <MDBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            disableFuture
          />
          <DatePicker
            label="End"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            disableFuture
          />
        </LocalizationProvider>
      </MDBox>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="User Donations"
                description="Total donations by users"
                date="Updated based on selected dates"
                chart={userChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="success"
                title="Group Donations"
                description="Total donations by groups"
                date="Updated based on selected dates"
                chart={groupChartData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default Daily;
