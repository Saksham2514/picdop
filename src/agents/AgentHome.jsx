import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dashboard from "../admin/pages/DashboardLayout";
import OrderCard from "./components/OrderCard";
import { useSelector } from "react-redux";

export const AgentHome = () => {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getData = () =>{
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, {
      status: "Pending",
    },
    {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
      
    })
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    
      getData()
    
  }, []);

  return (
    <>
      <Dashboard>
        <Grid container sx={{ p: "1.5rem" }} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4" >
              Available Orders
            </Typography>
          </Grid>
          <Grid item xs={6}  textAlign={"right"}>
            <Button color="info" variant="text" onClick={getData}>Refresh</Button>
          </Grid>
          {loading ? (
            <>
              <Typography variant="subtitle2">Loading...</Typography>
            </>
          ) : (
            <>
              {data.length === 0 ? (
                <>No Orders available right now </>
              ) : (
                data.map((order, ind) => (
                  <Grid item xs={12} md={3} key={ind}>
                    <OrderCard data={order} key={ind} getData={getData}/>
                    
                  </Grid>
                ))
              )}
            </>
          )}
        </Grid>
      </Dashboard>
    </>
  );
};
