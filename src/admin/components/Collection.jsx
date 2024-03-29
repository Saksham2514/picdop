import React from "react";
import "../../assets/css/App.module.css";
import classes from  "../../assets/css/components.module.css";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import Row from "../pages/Row";

export default function Dashboard() {
  

  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          
          <Grid item xs={12}>
            <Row />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
