import React from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import SVG from "../../assets/admin/dashboard.png";
import { Button, Paper, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Table from "../pages/Table";
import ParcelForm from "../pages/ParcelForm";


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

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1981",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1982",
    },
    {
      id: 3,
      title: "Beetlejuice",
      year: "1983",
    },
    {
      id: 4,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 5,
      title: "Beetlejuice",
      year: "1985",
    },
    {
      id: 6,
      title: "Ghostbusters",
      year: "1986",
    },
    {
      id: 7,
      title: "Beetlejuice",
      year: "1987",
    },
    {
      id: 8,
      title: "Ghostbusters",
      year: "1988",
    },
    {
      id: 9,
      title: "Beetlejuice",
      year: "1989",
    },
    {
      id: 10,
      title: "Ghostbusters",
      year: "1990",
    },
    {
      id: 11,
      title: "Beetlejuice",
      year: "1991",
    },
    {
      id: 12,
      title: "Ghostbusters",
      year: "1992",
    },
  ];

  
  const columns = [
    {
      name: "ORDER ID ",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "FROM ",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "TO",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "PRICE",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.year,
      sortable: true,
    },
  ];




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
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <p>Create an Order</p>
                    </Typography>
                  </Grid>
                  <Grid container fullWidth spacing={1}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="From Shop"
                        sx={{
                          "&:focus ": { borderColor: "white" }, //styles the label
                          input: { color: "white" },
                          "& .MuiInputLabel-root": { color: "white" }, //styles the label
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                          "&:focus .MuiInputLabel-root": { color: "white" }, //styles the label
                          "&:focus .MuiOutlinedInput-root": {
                            "&:focus > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                          "&:active .MuiInputLabel-root": { color: "white" }, //styles the label
                          "&:active .MuiOutlinedInput-root": {
                            "&:active > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                      fullWidth
                        id="outlined-basic"
                        label="To Shop"
                        sx={{
                          input: { color: "white" },
                          "& .MuiInputLabel-root": { color: "white" }, //styles the label
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                          "&:focus .MuiInputLabel-root": { color: "white" }, //styles the label
                          "&:focus .MuiOutlinedInput-root": {
                            "&:focus > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                          "&:active .MuiInputLabel-root": { color: "white" }, //styles the label
                          "&:active .MuiOutlinedInput-root": {
                            "&:active > fieldset": {
                              color: "white",
                              borderColor: "white",
                            },
                          },
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      backgroundColor: "white",
                      color: "var(--main-color)",
                      borderRadius: "0.25rem",
                      margin: "1rem 0",
                      paddingX: "1rem",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Add Parcel Details
                  </Button>
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
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
             
              <ParcelForm/>
           
              {/* <Test/> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Recent Bookings
              </Typography>
              <Table data={data} columns={columns} />
            </Paper>
          </Grid>
          
          
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
