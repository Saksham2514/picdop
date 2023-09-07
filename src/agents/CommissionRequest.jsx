import React from 'react'
import DashboardLayout from '../admin/pages/DashboardLayout'
import { Grid, Paper, Typography } from '@material-ui/core'
import Table from '../admin/pages/Table'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const CommissionRequest = () => {
    const [data,setData] = useState([]);
    const [dataStatus,setDataStatus] = useState(0);
    const uid = useSelector((state) => state.id);
    const {token} = useSelector((state)=>state);

    const columns = [
        {
        name: "Redeem Amount",
        selector: (row) => row.amount,
        sortable: true,
        wrap: true,
        },
        {
        name: "Status",
        selector: (row) => <p style={{textTransform:"capitalize"}}>{row.status}</p>,
        sortable: true,
        wrap: true,
        },
        {
        name: "Last Updated",
        selector: (row) => <p>{new Date(row.updatedAt).toLocaleString("en-US",{timeZone:"Asia/Kolkata"})} </p>,
        sortable: true,
        wrap: true,
        }
    ];

    const getData = ()=>{
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}findRedeemReq`,{uid:uid},{
            headers:{
                "Authorization":token
            }
        })
        .then((res) => {
            setData(res.data);
            setDataStatus(res.status);
        })
        .catch((err) => console.log(err));
    }
    
    useEffect(()=>{
        getData();
    },[])

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
                        Pending Requests
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

export default CommissionRequest