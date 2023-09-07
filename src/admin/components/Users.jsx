import React from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";

import { Paper } from "@mui/material";
import {ProfileForm} from "../pages/UserFormClass";
import { useState,useEffect } from "react";
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
  const classes = useStyles();
  
const [edit, setEdit] = useState(false)

const [long, setLong] = useState("");
const [lat, setLat] = useState("");
const {token} = useSelector(state=>state);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }
});


const [details, setDetails] = useState([{
  role:10,
  category:10,
  fname:"Brandon",
  lname:"Surname",
  mobile:"098765432",
  email:"support@brandon.co.in",
  shopName:"Brandon\n\n\n",
  address:"Online\n\n\n",
  
}])
return (
    <DashboardLayout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2} style={{ marginTop: "0.5rem" , display:"flex",justifyContent:"center"}}>
          <Grid item xs={9}>
            <Paper style={{ padding: "1rem", borderRadius: "1rem" }} elevation={5}>
              <ProfileForm edit={edit} setEdit={setEdit} data={details} setDetails={setDetails} token={token}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
