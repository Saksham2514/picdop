import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../admin/pages/DashboardLayout";
import OrderCard from "./components/AcceptOrderCard";
export const AgentOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useSelector((state) => state);
  console.log(id);

  const removeCard = (id)=>{
    const filteredArr = data.filter((asd)=>{
      return asd._id!=id;
    })
    setData(filteredArr);
  }

  const getData = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}orders/search`, {
        $or: [
          {status: "Accepted"},
      ],
        agentId: id,
      })
      .then((res) => {  
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Dashboard>
        <Grid container sx={{ p: "1.5rem" }} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">Accepted Orders</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Button color="info" variant="text" onClick={getData}>
              Refresh
            </Button>
          </Grid>
          {loading ? (
            <>
              <Typography variant="subtitle2">Loading...</Typography>
            </>
          ) : (
            <>
              {data.length === 0 ? (
                <Typography variant="body1" marginY={1} marginLeft={3}>
                  You have not accepted any orders yet{" "}
                </Typography>
              ) : (
                data.map((order, ind) => (
                  <Grid item xs={12} key={order._id}>
                    <OrderCard data={order} getData={getData} removeCard={removeCard}/>
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
