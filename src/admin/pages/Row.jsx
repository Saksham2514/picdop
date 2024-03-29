import React, { useState } from "react";

import { Typography, Chip, Grid, Button, Paper } from "@mui/material";
import DatePicker from "react-datepicker";
import Table from "../pages/Table";
import "react-datepicker/dist/react-datepicker.css";
import classes from "../../assets/css/Root.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Row = () => {
  const [data, setData] = useState([]);
  const [createdOrders, setCreatedOrders] = useState([]);
  const [fromOrders, setFromOrders] = useState([]);
  const [toOrders, setToOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [dataStatus, setDataStatus] = useState(0);
  const [createdOrdersStatus, setCreatedOrdersStatus] = useState(0);
  const [fromOrdersStatus, setFromOrdersStatus] = useState(0);
  const [toOrdersStatus, setToOrdersStatus] = useState(0);
  const [usersStatus, setUsersStatus] = useState(0);

  const { role, id,token } = useSelector((state) => state);
  const [choice, setChoice] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState(
    role === "admin"
      ? {}
      : { $or: [{ from: id }, { to: id }, { createdBy: id }] }
  );

  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]["_id"] === nameKey) {
        return myArray[i]["name"];
      }
    }
  }

  function getData() {
    if(role!=="admin"){
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`,  { createdBy: id },{
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
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, { from: id } ,{
          headers:{
              "Authorization":token
          }
        })
      .then((res) => {
        setFromOrders(res.data);
        setFromOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, { to: id },{
          headers:{
              "Authorization":token
          }
        })
      .then((res) => {
        setToOrders(res.data);
        setToOrdersStatus(res.status);
      })
      .catch((err) => console.log(err));

    }else{
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/search`,{},{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        setUsers(res.data);
        setUsersStatus(res.status);
      })
      .catch((err) => console.log(err));
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}orders/search`,
        filter,{
          headers:{
              "Authorization":token
          }
        }
      )
      .then((res) => {
        setData(res.data)
        setDataStatus(res.status);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setTimeout(getData(), 60000);
  }, [filter]);

  const columns = [
    {
      name: "From ",
      selector: (row, ind) => {
        return search(row.from, users);
      },
      sortable: true,
      wrap: true,
    },

    {
      name: "To ",
      selector: (row) => {
        return search(row.to, users);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row, ind) => (
        <div
          className={
            row.status === "Pending"
              ? `${classes.chip} ${classes.pending}`
              : row.status === "Completed"
              ? `${classes.chip} ${classes.success}`
              : row.status === "Accepted"
              ? `${classes.chip} ${classes.info}`
              : "error"
          }
          key={ind}
          variant="outlined"
          sx={{ wordWrap: "break-word" }}
        >
          {row.status}
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Agent",
      selector: (row) => row.agentName || "Not Assigned",
      sortable: true,
      wrap: true,
    },
    {
      name: "OTP",
      selector: (row) => row.otp,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mode",
      selector: (row) => row.paymentMode,
      sortable: true,
      wrap: true,
    },
    {
      name: "Amount",
      selector: (row) => "₹ " + row.parcelPaymentCollection,
      sortable: true,
      wrap: true,
    },
    {
      name: "Height",
      selector: (row) => row.parcelHeight + " inch",
      sortable: true,
      wrap: true,
    },
    {
      name: "Length",
      // selector: (row) => row.parcelLength+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelLength + " inch",
      sortable: true,
      wrap: true,
    },
    {
      name: "Width",
      // selector: (row) => row.parcelWidth+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelWidth + " inch",
      sortable: true,
      wrap: true,
    },
    {
      name: "Weight",
      // selector: (row) => row.parcelWeight+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelWeight + " kg",
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      // selector: (row) => row.parcelDate+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => {
        const date = new Date(row.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dt = date.getDate();
        return `${year}-${month}-${dt}`;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Pick at",
      selector: (row) => {
        return row.pickupDate
          ? new Date(row.pickupDate).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })
          : "Not picked";
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Ship at",
      selector: (row) => {
        return row.deliveryDate
          ? new Date(row.deliveryDate).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })
          : "Not delivered";
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",

      selector: (row) => (
        <Link to={`/orders/${row._id}`}>View Order details</Link>
      ),
      wrap: true,
    },
  ];

  const userColumns = [
    {
      name: "Name ",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      wrap: true,
    },
    {
      name: "Shop No",
      selector: (row) => row.shopNumber,
      sortable: true,
      wrap: true,
    },
    {
      name: "Shop Name",
      selector: (row) => row.shopName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      render: (row, ind) => {
        <span
          className={
            row.role === "admin"
              ? `${classes.chip} ${classes.pending}`
              : row.role === "agent"
              ? `${classes.chip} ${classes.info}`
              : row.role === "user"
              ? `${classes.chip} ${classes.success}`
              : `${classes.chip} ${classes.error}`
          }
          key={ind}
          variant="outlined"
        >
          {row.role}
        </span>;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Reg.Date",
      selector: (row) => {
        const date = new Date(row.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dt = date.getDate();
        return `${year}-${month}-${dt}`;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link to={`/users/${row._id}`}>View User details</Link>
      ),
    },
  ];

  const handleClick = () => {
    setChoice(!choice);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography
            style={{
              paddingBottom: "1rem",
              paddingRight: "1rem",
              fontWeight: "bold",
              marginRight: "1rem",
              textTransform: "capitalize",
            }}
            variant="h6"
          >
            {role} Dashboard
          </Typography>
          {role === "admin" ? (
            <>
              <Chip
                label="Users"
                variant="outlined"
                id={choice ? classes.bgN : classes.bg}
                onClick={handleClick}
              />

              <Chip
                label="Orders"
                id={choice ? classes.bg : classes.bgN}
                variant="outlined"
                onClick={handleClick}
              />
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid container paddingLeft={5} xs={12} md={6} padding={2}>
          <Grid item xs={12} sm={6}>
            Start Date
            <DatePicker
              selected={startDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            End Date
            <DatePicker
              selected={endDate}
              minDate={startDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setFilter({
                ...filter,
                createdAt: {
                  $gt: startDate.toISOString(),
                  $lt: endDate.toISOString(),
                },
              });
            }}
          >
            Load
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setStartDate();
              setEndDate();
              setFilter(
                role === "admin"
                  ? {}
                  : { $or: [{ from: id }, { to: id }, { createdBy: id }] }
              );
            }}
          >
            Clear Filter
          </Button>
        </Grid>
        {role!=="admin"?
         <>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Your Orders
              </Typography>
              <Table data={createdOrders} columns={ columns } status={createdOrdersStatus} />
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
              <Table data={fromOrders} columns={columns} status={fromOrdersStatus} />
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
              <Table data={toOrders} columns={columns} status={ toOrdersStatus} />
              {/* <Test/> */}
            </Paper>
          </Grid>
        </>
        :<Grid item xs={12} md={12}>
        <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
          <Typography
            style={{ paddingBottom: "1rem", fontWeight: "bold" }}
            variant="h5"
          >
            {choice?"All Orders":"Users"}
          </Typography>
          <Table data={choice ? data : users} columns={choice ? columns : userColumns} status={choice ? dataStatus : usersStatus} />
          {/* <Test/> */}
        </Paper>
      </Grid>}
      </Grid>
    </div>
  );
};

export default Row;
