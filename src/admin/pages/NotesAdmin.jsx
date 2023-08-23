import React, { useEffect } from 'react';

import DashboardLayout from "../pages/DashboardLayout";
import styles from "../../assets/css/components.module.css";
import {
  Button,
  Collapse,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import Table from "rc-table";
import { IconButton } from '@mui/material';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { DeleteOutlined } from '@material-ui/icons';
import Card from '../components/Card';
import axios from 'axios';

const NotesAdmin = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product_name,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      wrap: true,
    },
  ];

  useEffect(()=>{
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}getNotes`)
        .then((res) => {
          setData(res.data);
          console.log(res.data)
        })
        .catch((err) => console.log(err));
  },[])
  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={styles.container}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              className="paper"
              variant="outlined"
              elevation={3}
              style={{
                // backgroundColor: "var(--main-color)",
                // color: "white",
                padding: "0 0.5rem",
                minHeight:"75vh"
              }}
            >
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    <h2 style={{ textAlign: "center" }}>Notes</h2>
                  </Typography>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{padding:"0 2rem"}}
                >
                  
                  {data.map((row,i)=><Grid item xs={12} md={4} lg={4}>
                    <Card data={row} key={i}/>
                  </Grid>)}
                  </Grid>
                  {/* {Array(4).fill(null).map(()=> */}
                  {/* <Collapse in={expand} timeout="auto" unmountOnExit style={{border:"1px solid black"}}>
                  <ListItem component="div">
                    <ListItemText primary={"as"}/>
                    <IconButton>
                      1
                    </IconButton>
                  </ListItem>
        </Collapse> */}

                  
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  )
}

export default NotesAdmin