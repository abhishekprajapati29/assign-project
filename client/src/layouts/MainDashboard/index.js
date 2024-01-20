/**
=========================================================
* Material MainDashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Grid from "@mui/material/Grid";

// Material MainDashboard 2 React components
import MDBox from "components/MDBox";

// Material MainDashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// MainDashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import data from "./data/countData";
function MainDashboard() {
  const { countData, chartData } = data();
  const { sales, tasks } = reportsLineChartData;

  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Public Project"
                count={countData.publicProjectCountTotal || 0}
                percentage={{
                  color: "success",
                  amount: countData.publicProjectCountCurrentWeek || 0,
                  label: "added this week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Private Project"
                count={countData.privateProjectCount || 0}
                percentage={{
                  color: "success",
                  amount: countData.privateProjectCountCurrentWeek || 0,
                  label: "created this week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Files"
                count={countData.fileCount || 0}
                percentage={{
                  color: "success",
                  amount: bytesToSize(countData.fileSize) || 0,
                  label: "total size",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Invites"
                count={countData.inviteCount || 0}
                percentage={{
                  color: "success",
                  amount: countData.inviteCurrentWeek || 0,
                  label: "invites this week",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Weekly Private Project Update"
                  description={
                    <>
                      (<strong>+{chartData?.weeklyPrivate?.info || 0}%</strong>) completed weekly
                      for private update.
                    </>
                  }
                  date="campaign sent 2 days ago"
                  chart={chartData?.weeklyPrivate?.chart || reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Weekly Public Project Update"
                  description={
                    <>
                      (<strong>+{chartData?.weeklyPublic?.info || 0}%</strong>) completed weekly for
                      public update.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={chartData?.weeklyPublic?.chart || sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Total monthly updates"
                  description={
                    <>
                      (<strong>+{chartData?.totalCount?.info || 0}%</strong>) completed monthly for
                      public update.
                    </>
                  }
                  date="just updated"
                  chart={chartData?.totalCount?.chart || sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default MainDashboard;
