import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import MDBox from "components/MDBox";
import axios from "axios";

function Charity() {
  const [charities, setCharities] = useState([]); // Lưu danh sách charity
  const [selectedCharity, setSelectedCharity] = useState(null); // Charity đã chọn
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Gọi API lấy danh sách charity
    axios
      .get("http://localhost:8080/api/charities")
      .then((response) => {
        // Map charities to the format Autocomplete expects
        const charityOptions = response.data.map((charity) => ({
          label: charity.title, // Assuming 'title' is the field you want to display in Autocomplete
          id: charity.id, // Use the id to identify the selected charity
        }));
        setCharities(charityOptions);
      })
      .catch((error) => console.error("Error fetching charities:", error));
  }, []);

  useEffect(() => {
    if (selectedCharity) {
      console.log("Fetching donation data for charity:", selectedCharity);
      // Gọi API hoặc logic lấy dữ liệu biểu đồ cho charity đã chọn
      fetchDonationData(selectedCharity.id);
    }
  }, [selectedCharity]); // Khi selectedCharity thay đổi, sẽ fetch lại dữ liệu mới

  const fetchDonationData = (charityId) => {
    const endpoint = `http://localhost:8080/api/donations/campaign/${charityId}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = [
          ...data.userDonations.map((donation) => ({
            label: donation.user.username,
            value: donation.amount,
          })),
          ...data.groupDonations.map((groupDonation) => ({
            label: groupDonation.group.groupName,
            value: groupDonation.amount,
          })),
        ];
        console.log(formattedData);

        // Kiểm tra dữ liệu trả về có đúng định dạng không
        setChartData({
          series: [
            {
              data: formattedData.map((item, index) => ({
                id: index,
                value: item.value,
                label: item.label,
              })),
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching donation data:", error));
  };

  return (
    <div>
      <MDBox>
        <Autocomplete
          disablePortal
          options={charities}
          sx={{ width: 300 }}
          onChange={(event, value) => setSelectedCharity(value)} // Khi chọn chiến dịch, set selectedCharity
          getOptionLabel={(option) => option.label} // Đảm bảo hiển thị đúng nhãn
          renderInput={(params) => <TextField {...params} label="Select Charity" />}
        />
      </MDBox>
      <MDBox>
        {/* Chỉ render PieChart nếu có dữ liệu */}
        {chartData.series[0].data.length > 0 ? (
          <PieChart series={chartData.series} width={1200} height={600} />
        ) : (
          <p>Chưa có dữ liệu để hiển thị biểu đồ. Vui lòng chọn chiến dịch.</p>
        )}
      </MDBox>
    </div>
  );
}

export default Charity;
