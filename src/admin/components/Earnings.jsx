import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import SVG from "../../assets/admin/dashboard.png";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "./Table"
import { Link } from "react-router-dom";


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


  
  
  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            {/* Grid Content */}

            <Paper
              variant="outlined"
              elevation={3}
              style={{
                backgroundColor: "var(--main-color)",
                color: "white",
                padding: "0 0.5rem",
              }}
            >
              <Grid container fullWidth>
                <Grid item xs={12} md={6}>
                  

                  <Typography variant="subtitle1">
                    <p>Book a Delivery</p>
                  </Typography>
                  
                  <Typography variant="body2">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                    </p>
                  </Typography>
                  <Link to="/delivery" style={{textDecoration:"none"}}>
                    Book
                  
                  </Link>
                </Grid>
                <Grid
                  component={Box}
                  item
                  md={6}
                  display={{ xs: "none", lg: "block" }}
                >
                  <img src={SVG} alt="" width={"100%"} height="100%" />
                </Grid>
                {/* Grid Content */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Paper></Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem" ,borderRadius:"1rem"}}>
            <Typography style={{paddingBottom : "1rem",fontWeight:"bold"}} variant="h5">Daily Earnings</Typography>
             <Table columns={1}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem" ,borderRadius:"1rem"}}>
            <Typography style={{paddingBottom : "1rem",fontWeight:"bold"}} variant="h5">Orders</Typography>
           <Table columns={2}/>
           {/* <Test/> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
