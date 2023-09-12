import React from 'react'
import DashboardLayout from "./DashboardLayout";
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import Table from './Table';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CommissionReq = () => {
    const [initiated,setInitiated] = useState([]);
    const [completed,setCompleted] = useState([]);
    const [rejected,setRejected] = useState([]);
    const [dataStatus,setDataStatus] = useState(0);
    const token = useSelector((state) => state.token);

    const columns = [
        {
        name: "Redeem Amount",
        selector: (row) => row.amount,
        sortable: true,
        wrap: true,
        },
        {
        name: "Account Holder",
        selector: (row) => row?.bankID?.holderName,
        sortable: true,
        wrap: true,
        },
        {
        name: "Account Number",
        selector: (row) => row.bankID?.accountNumber,
        sortable: true,
        wrap: true,
        },
        {
        name: "Bank Name",
        selector: (row) => row?.bankID?.bankName,
        sortable: true,
        wrap: true,
        },
        {
        name: "IFSC Code",
        selector: (row) => row?.bankID?.ifscCode,
        sortable: true,
        wrap: true,
        },
        {
        name: "UPI",
        selector: (row) => row?.bankID?.upi,
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
        name: "Action",
        selector: (row) =>
            row.status==="initiated"?<Grid  item style={{textAlign:"center"}}>
                <Button variant="outlined" color="error"  onClick={()=>{handleReject(row._id)}}>Reject</Button>
                <Button variant="outlined" color="info"  onClick={()=>{handleAccept(row._id)}}>Accept</Button>
            </Grid>:<p style={{textTransform:"capitalize"}}>{row.status}</p>,
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
            .post(`${process.env.REACT_APP_BACKEND_URL}findRedeemReq`,{},{
                headers:{
                    "Authorization":token
                }
            })
            .then((res) => {
                seprateData(res.data)
                console.log(res.data);
                setDataStatus(res.status);
            })
            .catch((err) => console.log(err));
    }

    const seprateData = async(data)=>{
        setCompleted([]);
        setInitiated([]);
        setRejected([]);
        await data.map((row)=>{
            if (row.status==="initiated") {
                setInitiated((curr)=>[...curr,row])
            }else if(row.status==="completed"){
                setCompleted((curr)=>[...curr,row])
            }else if(row.status==="rejected"){
                setRejected((curr)=>[...curr,row])
            }
        })
    }

    const handleAccept = (id)=>{
        updateReq(id,"completed",(res)=>{
            changeData(res,"completed")
        });
    }
    const handleReject = (id)=>{
        updateReq(id,"rejected",(res)=>{
            changeData(res,"rejected")
        });      
    }

    const changeData = (res, type)=>{
        const filteredInit = initiated.filter((row)=>{
            if(row._id != res?._id){
                return true;
            }else if(type==="rejected"){
                row.status = 'rejected'
                setRejected((curr)=>{
                    return [...curr,row];
                })
            }else if(type==="completed"){
                row.status = 'completed'
                setCompleted((curr)=>{
                    return [...curr,row];
                })
            }
        });
        setInitiated(filteredInit);
    }

    const updateReq = (redeemID,status,callback)=>{
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}updateRedeemReq`,{
            status:status,redeemID:redeemID
        },{
            headers:{
                "Authorization":token
            }
        })
        .then((res) => {
            if(res.data?._id || status==="rejected") callback(res.data);
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
                    <Table data={initiated } columns={ columns } status={ dataStatus } />
                    {/* <Test/> */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
                    <Typography
                        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                        variant="h5"
                    >
                        Accepted Requests
                    </Typography>
                    <Table data={completed } columns={ columns } status={ dataStatus } />
                    {/* <Test/> */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper style={{ padding: "1rem", borderRadius: "1rem" }}>
                    <Typography
                        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                        variant="h5"
                    >
                        Rejected Requests
                    </Typography>
                    <Table data={rejected } columns={ columns } status={ dataStatus } />
                    {/* <Test/> */}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </DashboardLayout>
  )
}

export default CommissionReq