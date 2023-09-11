import React from "react";
import "../../assets/css/App.module.css";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";

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
  const [dailyOrders, setDailyOrders] = useState([]);

  const [createdOrders, setCreatedOrders] = useState([]);
  const [fromOrders, setFromOrders] = useState([]);
  const [toOrders, setToOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [dailyOrdersStatus, setDailyOrdersStatus] = useState(0);
  const [createdOrdersStatus, setCreatedOrdersStatus] = useState(0);
  const [fromOrdersStatus, setFromOrdersStatus] = useState(0);
  const [toOrdersStatus, setToOrdersStatus] = useState(0);
  const [usersStatus, setUsersStatus] = useState(0);

  // Analysis States

  const [adminData, setAdminData] = useState([]);
  const [expEarData, setExpEarData] = useState([]);

  // Analysis States end

  const uid = useSelector((state) => state.id);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();
  const tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toISOString();


  const getData = (id) => {
    axios
      .post(
        id,
        {
          createdAt: {
            $gte: yesterday,
            $lte: tomorrow,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setDailyOrders(res.data);
        setDailyOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));
    axios
      .post(id,  { createdBy: uid },{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        setCreatedOrders(res.data);
        setCreatedOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));
    axios
      .post(id, { from: uid },{
        headers:{
            "Authorization":token
        }
      } )
      .then((res) => {
        setFromOrders(res.data);
        setFromOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));
    axios
      .post(id, { to: uid },{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        setToOrders(res.data);
        setToOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users`,{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        setUsers(res.data);
        setUsersStatus(res.status);
      })
      .catch((err) => console.log(err));
  };

  // const getAnalysis = (id) => {
  //   console.log(id);
  //   const URL =
  //     role === "admin"
  //       ? `${process.env.REACT_APP_BACKEND_URL}admin/earnings/status`
  //       : `${process.env.REACT_APP_BACKEND_URL}admin/earnings/`;

  //   axios
  //     .post(
  //       URL,
  //       {
  //         id: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setAdminData(res.data);
  //     })
  //     .catch((err) => console.warn(err));
  // };

  const getSummary = ()=>{
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}getSummary`,{},{
        headers:{
          "Authorization":token
        }
      })
      .then((res) => {
        setExpEarData(res.data);
      })
      .catch(
        (err) => {
          console.log(err)
          dispatch(logout());
        });
  }

  useEffect(() => {
    getData(`${process.env.REACT_APP_BACKEND_URL}orders/search`);
    getSummary();
  }, []);

  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]["_id"] === nameKey) {
        return myArray[i]["name"];
      }
    }
  }

  const columns1 = [
    {
      name: "ORDER ID ",
      selector: (row) => row._id,
      sortable: true,
      wrap: true,
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
      selector: (row, ind) => {
        return search(row.to, users);
      },
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

  const classes = useStyles();

  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            {/* Grid Content */}

            <Paper
              elevation={3}
              style={{
                backgroundColor: "var(--main-color)",
                color: "white",
                padding: "0 0.5rem",
              }}
            >
              <Grid container>
                <Grid item xs={12} md={6} >
                  <Typography variant="subtitle1"style={{margin:".2rem 0"}}>
                    Book a Delivery
                  </Typography>
                  <Typography variant="body2"style={{margin:".2rem 0"}}>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                  </Typography>
                  <Link to="/delivery" style={{ textDecoration: "none",margin:".2rem 0" }}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "white",
                        color: "var(--main-color)",
                        borderRadius: "0.25rem",
                        marginBottom: "1rem",
                        paddingX: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      Book Delivery
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
          {/* {role === "admin" ? ( */}
          <Grid item xs={12}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                {role==="admin"?"Earning":"Expenditures"}
              </Typography>
              {/* <Table data={dailyOrders} columns={columns1} status={dailyOrdersStatus} /> */}
              <Grid container spacing={3}>
                {expEarData.map((data, ind) => (
                  <Grid item xs={12} md={3} key={ind}>
                    <Paper
                      elevation={4}
                      style={{ paddingTop: 10, paddingBottom: 10 }}
                    >
                      <Typography textAlign={"center"} variant="h6">
                        {data[0]}
                      </Typography>
                      <Typography textAlign={"center"}>
                      ₹ {data.length>1?`${data[1].amount}`:"0"}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
           {/* ) : ( 
             <></>
             )}  */}
             
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Your Orders
              </Typography>
              <Table data={createdOrders} columns={columns1} status={createdOrdersStatus} />
              {/* <Test/> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Orders to be Shipped
              </Typography>
              <Table data={fromOrders} columns={columns1} status={fromOrdersStatus} />
              {/* <Test/> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Orders to be Received
              </Typography>
              <Table data={toOrders} columns={columns1} status={toOrdersStatus} />
              {/* <Test/> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
