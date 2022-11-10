import React, { useState } from "react";
import { Stack, Typography, Chip, Grid , Button} from "@mui/material";
import "../../Root.css";
import DatePicker from "react-datepicker";
import Table from "../pages/Table"
import "react-datepicker/dist/react-datepicker.css";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";

const Row = () => {

  
  const data = [
    {
      title:"test",
name:"test",
email:"test",
location:"test",
role:"test",
shop:"test",
kyc:<Chip label="Completed" color="success" variant="outlined" />,
btn:<Link to="/orders" style={{textDecoration:"none"}}><Button style={{backgroundColor:"var(--main-color)",color:"white"}} >test</Button></Link>,
    },
   
  ];

  
  const columns = [
    {
      name: "ORDER ID ",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "NAME ",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "LOCATION",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "SHOP NAME",
      selector: (row) => row.shop,
      sortable: true,
    },
    {
      name: "KYC",
      selector: (row) => row.kyc,
      sortable: true,
    },
    {
      name: "VIEW",
      selector: (row) => row.btn,
      sortable: true,
    },
  ];


  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
              }}
              variant="h5"
            >
              Daily Earnings
            </Typography>
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
