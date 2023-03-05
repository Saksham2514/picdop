import React from 'react'
import "../assets/css/App.module.css";
import {
    Grid,
    
  } from "@mui/material/";
  
import s from "../main_svg.png";
import logo from "./logo.png";


const Layout = (props) => {
  return (
    <div className='App'>
        <Grid
        sx={{ p: 3 }}
        container
        rowSpacing={1}
        columnSpacing={{  lg: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} lg={6} component="div" sx={{ display: "inline" }}>
          <Grid item xs={12} lg={12} component="div" sx={{ display: "inline" }}>
            <Grid container>
              <Grid item xs={6} >
              <img src={logo} alt="s" style={{ width:"10rem"}} />
              </Grid>
              <Grid item xs={6} >
                <p style={{ textAlign: "right", fontWeight: "bold" }}>
                  User Register
                </p>
              </Grid>
            </Grid>
          </Grid>
          {props.children}
        </Grid>
        <Grid item lg={6} sx={{display:{xs:"none",lg:"block"}}}>
          <img src={s} alt="s" style={{ width: "75%" ,position:"sticky",top:0}} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Layout
