import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "./DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import SVG from "../../assets/admin/dashboard.png";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "./Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const id = useSelector((state) => state.id);
  const role = useSelector((state) => state.role);

  const getData = (id) => {
    axios
      .get(id)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    role === "admin"
    ? getData(`${process.env.REACT_APP_BACKEND_URL}orders`)
    : getData(`${process.env.REACT_APP_BACKEND_URL}order/${id}`);
  }, []);

  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]['_id'] === nameKey) {
        return myArray[i]['name'];
      }
    }
  }

  const columns1 = [
    {
      name: "ORDER ID ",
      selector: (row) => row._id,
      sortable: true,
      wrap:true
    },
    {
      name: "FROM ",
      selector: (row, ind) => {
        return search(row.from,users)
      },
      sortable: true,
      wrap:true
    },
    
    {
      name: "to ",
      selector: (row, ind) => {
        return search(row.to,users)
      },
      sortable: true,
      wrap:true
    },
    
    {
      name: "height",
      selector: (row) => row.parcelHeight+" inch",
      sortable: true,
      wrap:true
    },
    {
      name: "length",
      selector: (row) => row.parcelLength+" inch",
      sortable: true,
      wrap:true
    },
    {
      name: "width",
      selector: (row) => row.parcelWidth+" inch",
      sortable: true,
      wrap:true
    },
    {
      name: "weight",
      selector: (row) => row.parcelWeight+" kg",
      sortable: true,
      wrap:true
    },
    
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      sortable: true,
      wrap:true,
    },
    
    {
      name: "Collection done",
      selector: (row) => row.parcelPaymentCollection,
      sortable: true,
      wrap:true
    },
  ];

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
                  <Link to="/delivery" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "white",
                        color: "var(--main-color)",
                        borderRadius: "0.25rem",
                        marginBottom: "1rem",
                        padding: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      Book
                    </Button>
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

        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Daily Earnings
              </Typography>
              <Table data={orders} columns={columns1} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Orders
              </Typography>
              <Table data={orders} columns={columns1} />
              {/* <Test/> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
