import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "../pages/DashboardLayout";
import List from "../pages/List";
import { Container, Grid, Typography } from "@material-ui/core";

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

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Grid container alignContent="center">
          <Grid item xs={12}>
            {/* Grid Content */}
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} style={{padding:0,marginBottom:"1rem"}}>
                <Typography variant="h5" >Set Prices</Typography>
              </Grid>
              {/* Labels */}
              <Grid item xs={3} style={{textAlign:"",paddingLeft:"0.5rem",margin:0}}>
                <Typography variant="button" >Category</Typography>
              </Grid>
              <Grid item xs={3} style={{textAlign:"",paddingLeft:"0.5rem",margin:0}}>
                <Typography variant="button" >Limit</Typography>
              </Grid>
              <Grid item xs={3} style={{textAlign:"",paddingLeft:"0.5rem",margin:0}}>
                <Typography variant="button" >Local Prices</Typography>
              </Grid>
              <Grid item xs={3} style={{textAlign:"",paddingLeft:"0.5rem",margin:0}}>
                <Typography variant="button" >Outcity Prices</Typography>
              </Grid>

              <Grid item xs={12} style={{padding:0,margin:0}}>
                <List
                  key={Math.random()}
                  category="Weight"
                  limit="500g - 1 kg"
                  localPrice="50"
                  outCityPrice="80"
                ></List>
                <List
                  key={Math.random()}
                  category="Weight"
                  limit="500g - 1 kg"
                  localPrice="50"
                  outCityPrice="80"
                ></List>
                <List
                  key={Math.random()}
                  category="Weight"
                  limit="500g - 1 kg"
                  localPrice="50"
                  outCityPrice="80"
                ></List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
