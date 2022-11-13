import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";

import { Paper } from "@mui/material";
import UserForm from "../pages/UserForm";
import { useState } from "react";

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
              <UserForm edit={edit} setEdit={setEdit} data={details} setDetails={setDetails} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
