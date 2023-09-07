import React from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "../pages/DashboardLayout";
import { Container, Grid } from "@material-ui/core";

import { Paper } from "@mui/material";
import ProfileForm from "../pages/ProfileForm";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loading } from "../pages/Loading";

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
  const { id,token } = useSelector((state) => state);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/search`, {
        _id: id,
      })
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {details ? (
        <>
          <DashboardLayout>
            <Container maxWidth="lg" className={classes.container}>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={9}>
                  <Paper
                    style={{ padding: "1rem", borderRadius: "1rem" }}
                    elevation={5}
                  >
                    <ProfileForm
                      edit={edit}
                      setEdit={setEdit}
                      data={details[0]}
                      setDetails={setDetails}
                      token={token}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </DashboardLayout>
        </>
      ) : (
        <Loading/>
      )}
    </>
  );
}
