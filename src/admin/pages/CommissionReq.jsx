import React from 'react'
import DashboardLayout from "./DashboardLayout";
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import Table from './Table';
import { useState } from 'react';

const CommissionReq = () => {
    const [data,setData] = useState([]);
    const [dataStatus,setDataStatus] = useState(200);

    const columns = [
        {
        name: "Agent ID",
        selector: (row) => row.agentID,
        },
        {
        name: "Redeem Amount",
        selector: (row) => row.amount,
        sortable: true,
        wrap: true,
        },
        {
        name: "Status",
        selector: (row) => row.quantity,
        sortable: true,
        wrap: true,
        },
        {
        name: "Action",
        selector: (row) => <>
            <Grid  item xs={2} style={{textAlign:"center"}}>
                <Button variant="outlined" color="error"  onClick={()=>{
                    console.log(row._id)
                }}>Delete</Button>
                <Button variant="outlined" color="info"  onClick={()=>{console.log(row._id)}}>Update</Button>
            </Grid>
        </>,
        sortable: true,
        wrap: true,
        },
        
    ];

  return (
    <DashboardLayout>
        <div style={{padding:"20px"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
                    <Typography
                        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                        variant="h5"
                    >
                        All Requests
                    </Typography>
                    <Table data={data } columns={ columns } status={ dataStatus } />
                    {/* <Test/> */}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </DashboardLayout>
  )
}

export default CommissionReq