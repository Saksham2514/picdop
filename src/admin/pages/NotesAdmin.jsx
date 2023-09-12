import React, { useEffect } from "react";

import DashboardLayout from "../pages/DashboardLayout";
import styles from "../../assets/css/components.module.css";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";

const NotesAdmin = () => {
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}getNotes`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
                paddingBottom: "2rem",
                paddingLeft:"1rem"
              }}
            >
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1"  sx={{ fontWeight: "bold" }}>
                    <h2 style={{ textAlign: "center" }}>Notes</h2>
                  </Typography>
                </Grid>
                <Grid container spacing={3} style={{ padding: "0 0rem" }}>
                  {data.map((row, i) => (
                    <Grid item xs={12} md={4} lg={4}>
                      <Card data={row} key={i} />
                    </Grid>
                  ))}
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
  );
};

export default NotesAdmin;
