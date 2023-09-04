import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../admin/pages/DashboardLayout";
import OrderCard from "./components/AcceptOrderCard";
export const CompletedOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id,role } = useSelector((state) => state);
  const [expEarData, setExpEarData] = useState([]);

  const getData = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, {
        $or: [{ status: "Completed" }],
        agentId: id,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getSummary = ()=>{
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}getSummary`, {
        role:role,userID:id
      })
      .then((res) => {
        setExpEarData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
    getSummary();
  }, []);

  return (
    <>
      <Dashboard>
        <Grid container sx={{ p: "1.5rem" }} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">Completed Orders</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Button color="info" variant="text" onClick={getData}>
              Refresh
            </Button>
          </Grid>
          {expEarData.map((data,ind)=><Grid item xs={12} md={4} lg={3}>
            <StatCard 
              title={data[0] + " Commission"}
              price={data[1]?.amount || "0"}
            />
          </Grid>)}
          {loading ? (
            <>
              <Typography key={1} variant="subtitle2">
                Loading...
              </Typography>
            </>
          ) : (
            <>
              {data.length === 0 ? (
                <Typography variant="body1" marginY={1} marginLeft={3}>
                  You have not accepted any orders yet{" "}
                </Typography>
              ) : (
                data.map((order, ind) => (
                  <Grid item xs={4}>
                    <OrderCard data={order} getData={getData} key={ind} />
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

const StatCard = ({title,price}) => {
  return (
    <>
      <Paper variant="elevation" elevation={4} sx={{ p: 1 }}>
        <Grid container>
          <Grid item xs={7}>
            {title}
          </Grid>
          <Grid item xs={5} textAlign={"end"}>
            {price}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
