import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import SVG from "../../assets/admin/dashboard.png";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "../pages/Table";
import ParcelForm from "../pages/ParcelForm";
import { useState } from "react";
import { TypeAhead } from "./TypeAhead";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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

  const { id } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [parcelDetails, setParcelDetails] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [users, setUsers] = useState([]);
  

  const classes = useStyles();

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
      name: "Agent",
      selector: (row) => row.agentName,
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

  const getData = () =>{
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`,
        {
          $or: [
            { from: id },
            { to: id },
            { createdBy: id },
          ],
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
      
      axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.message));
  }
  useEffect(() => {
    getData();
  }, []);

 

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
                      <TypeAhead label="From" setFrom={setFrom} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TypeAhead label="To" setFrom={setTo} />
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
                    onClick={(e) => {
                      
                      from && to
                      ? 
                        setParcelDetails({
                          ...parcelDetails,
                          from: from,
                          to: to,
                        })
                        
                      : alert("Set pickup Source and destination");
                      

                      console.log( parcelDetails )
                     
                    }
                  }
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

        <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <ParcelForm
                details={parcelDetails}
                setDetails={setParcelDetails}
              />
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
              <Table  data={data} columns={columns} expand={false}/>
            </Paper>
          </Grid>
        </Grid>
      </Container> 
    </DashboardLayout>
  );
}
