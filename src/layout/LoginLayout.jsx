import React from "react";

import { Grid } from "@mui/material/";

import s from "../login.png";
import logo from "../logo.png";
import "../assets/css/App.module.css";
const Layout = (props) => {
  return (
    <div className="App">
      <Grid
        sx={{ px: 3 }}
        container
        rowSpacing={1}
        columnSpacing={{ lg: 1, sm: 2, md: 3 }}
      >
        <Grid item lg={5} xs={12} component="div" sx={{ display: "inline" }}>
         
            <Grid container>
              <Grid item  xs={6} >
              <img src={logo} alt="s" style={{ width:"10rem"}} />
              </Grid>
            </Grid>
         
          {props.children}
        </Grid>

        <Grid item lg={7} sx={{display:{xs:"none" , lg:"block"}}} >
          <img src={s}  alt="s" style={{ width: "80%" }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
