import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
// import SVG from "../../assets/admin/dashboard.png";
import { Paper } from "@mui/material";
// import { Box } from "@mui/system";
// import Table from "../pages/Table";
import OrderView from "../pages/OrderView";

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
        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          <Grid item xs={12} md={8} style={{margin:"auto"}}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <OrderView />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
