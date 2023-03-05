import React from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import SVG from "../../assets/admin/dashboard.png";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "./Table"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


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

  const { id,role } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = (id) => {
    console.log("ID sent to get data : " + id);
    try {
      axios
        .get(id)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}users`)
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err.message));
    } catch (err) {
      console.log(err);
    } finally {
      
    }
  };

 
  useEffect(() => {
    console.log(id);
    role === "admin"
      ? getData(`${process.env.REACT_APP_BACKEND_URL}orders`)
      : getData(`${process.env.REACT_APP_BACKEND_URL}order/${id}`);
  }, [data]);


  const columns = [
    {
      name: "ORDER ID ",
      selector: (row) => row._id,
    },
    {
      name: "FROM ",
      selector: (row, ind) => {
        return search(row.from, users);
      },
      sortable: true,
      wrap: true,
    },

    {
      name: "to ",
      selector: (row) => {
        return search(row.to, users);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "status",
      selector: (row, ind) => (
        <Chip
          label={row.status}
          key={ind}
          color={
            row.status === "Pending"
              ? "warning"
              : row.status === "Completed"
              ? "success"
              : row.status === "Accepted"
              ? "info"
              : "error"
          }
          variant="outlined"
          sx={{ wordWrap: "break-word" }}
        />
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "height",
      selector: (row) => row.parcelHeight + " inch",
      sortable: true,
      wrap: true,
    },

    {
      name: "length",
      selector: (row) => row.parcelLength + " inch",
      sortable: true,
      wrap: true,
    },
    {
      name: "width",
      selector: (row) => row.parcelWidth + " inch",
      sortable: true,
      wrap: true,
    },
    {
      name: "weight",
      selector: (row) => row.parcelWeight + " kg",
      sortable: true,
      wrap: true,
    },

    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      sortable: true,
      wrap: true,
    },

    {
      name: "Collection done",
      selector: (row) => row.parcelPaymentCollection,
      sortable: true,
      wrap: true,
    },
  ];
  
  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]["_id"] === nameKey) {
        return myArray[i]["name"];
      }
    }
  }

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
                    Book Delivery
                  
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
            <Table data={data} columns={columns} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
