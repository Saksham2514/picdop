import React, { useState } from "react";
import { Stack, Typography, Chip, Grid, Button } from "@mui/material";
import "../../Root.css";
import DatePicker from "react-datepicker";
import Table from "../pages/Table";
import "react-datepicker/dist/react-datepicker.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Row = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const { role,id } = useSelector((state) => state);
  const [choice, setChoice] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]["_id"] === nameKey) {
        return myArray[i]["name"];
      }
    }
  }

  useEffect(() => {
    axios
      .get(role === "admin" ? `${process.env.REACT_APP_BACKEND_URL}orders`:`${process.env.REACT_APP_BACKEND_URL}order/${id}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users`)
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
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
      selector: (row) => row.agentName || "-",
      sortable: true,
    },
    {
      name: "OTP",
      selector: (row) => row.otp,
      sortable: true,
    },
    {
      name: "Paid In",
      selector: (row) => row.paymentMode,
      sortable: true,
    },
    {
      name: "Height",
      selector: (row) => row.parcelHeight + " inch",
      sortable: true,
    },
    {
      name: "Length",
      // selector: (row) => row.parcelLength+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelLength + " inch",
      sortable: true,
    },
    {
      name: "Width",
      // selector: (row) => row.parcelWidth+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelWidth + " inch",
      sortable: true,
    },
    {
      name: "Weight",
      // selector: (row) => row.parcelWeight+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
      selector: (row) => row.parcelWeight + " kg",
      sortable: true,
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
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Shop No",
      selector: (row) => row.shopNumber,
      sortable: true,
    },
    {
      name: "Shop Name",
      selector: (row) => row.shopName,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row, ind) => (
        <Chip
          label={row.role}
          key={ind}
          color={
            row.role === "admin"
              ? "warning"
              : row.role === "agent"
              ? "success"
              : row.role === "user"
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
      name: "Reg.Date",
      selector: (row) => {
        const date = new Date(row.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dt = date.getDate();
        return `${year}-${month}-${dt}`;
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link to={`/users/${row._id}`}>View User details</Link>
      ),
      wrap: true,
    },
  ];

  const handleClick = () => {
    setChoice(!choice);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <Stack direction="row">
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
                  id={choice ? "bgN" : "bg"}
                  onClick={handleClick}
                />

                <Chip
                  label="Orders"
                  id={choice ? "bg" : "bgN"}
                  variant="outlined"
                  onClick={handleClick}
                />
              </>
            ) : (
              ""
            )}
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack direction="row">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <Typography
              style={{
                paddingRight: "1rem",
                paddingLeft: "1rem",
                fontWeight: "bold",
              }}
              variant="button"
            >
              -
            </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Table
            expand={false}
            data={choice ? data : users}
            columns={choice ? columns : userColumns}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Row;
