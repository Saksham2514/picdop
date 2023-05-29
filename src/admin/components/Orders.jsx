import React from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
// import SVG from "../../assets/admin/dashboard.png";
import { Paper } from "@mui/material";
// import { Box } from "@mui/system";
// import Table from "../pages/Table";
import OrderView from "../pages/OrderView";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  // added the footer class
}));

export default function Dashboard() {
  const classes = useStyles();

  const {orderId} = useParams()

  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          <Grid item xs={12} md={8} style={{margin:"auto"}}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <OrderView id={orderId} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
