import { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/sr/components/Header";
import Daily from "layouts/sr/components/Daily";
import Monthly from "layouts/sr/components/Monthly";
import Charity from "layouts/sr/components/Charity";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
function SR() {
  const [reportType, setReportType] = useState("charity");
  const [donationType, setDonationType] = useState("daily");
  const handleDonationChange = (event) => {
    setDonationType(event.target.value);
  };
  const renderReport = () => {
    switch (reportType) {
      case "charity":
        return <Charity />;
      case "donation":
        return donationType === "daily" ? <Daily /> : <Monthly />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Header onTabChange={setReportType}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {reportType === "donation" && (
                <MDBox mt={4}>
                  <FormControl component="fieldset">
                    <RadioGroup row value={donationType} onChange={handleDonationChange}>
                      <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                      <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                    </RadioGroup>
                  </FormControl>
                </MDBox>
              )}
              <MDBox mt={4}>{renderReport()}</MDBox>
            </Grid>
          </Grid>
        </Header>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SR;
