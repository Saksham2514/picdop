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
  const { id } = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, {
        createdBy: id,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const data1 = [
    {
      title: "test",
      name: "test",
      email: "test",
      location: "test",
      role: "test",
      shop: "test",
      kyc: <Chip label="Completed" color="success" variant="outlined" />,
      btn: (
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <Button
            style={{ backgroundColor: "var(--main-color)", color: "white" }}
          >
            test
          </Button>
        </Link>
      ),
    },
  ];

  const columns = [
    {
      name: "From ",
      selector: (row) => row.from,
      sortable: true,
    },
    {
      name: "to ",
      selector: (row) => row.to,
      sortable: true,
    },
    {
      name: "Paid In",
      selector: (row) => row.paymentMode,
      sortable: true,
    },
    {
      name: "Height",
      // selector: (row) => row.parcelHeight+" x "+row.parcelLength+" x "+row.parcelWidth+" inch",
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
  ];

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const role = useSelector((state) => state.role);
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
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={handleClick}
                />

                <Chip
                  label="Orders"
                  id="bg"
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
          <Table data={data} columns={columns} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Row;
