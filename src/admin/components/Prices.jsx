import React, { useState } from "react";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "../pages/DashboardLayout";
import List from "../pages/List";
import { Container, Grid, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import CommissionCard from "../pages/CommissionCard";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  // added the footer class
}));

export default function Dashboard() {
  const classes = useStyles();
  // const [category, setCategory] = useState({});
  const [error, setError] = useState();
  const [errType, setErrType] = useState("error");
  const [data, setData] = useState([]);
  const [commissionData,setCommissionData] = useState();
  const [breakpoint,setBreakpoint] = useState();
  const { token } = useSelector((state) => state);

  useEffect(() => {
    setBreakpoint(commissionData?.breakpoint);
  }, [commissionData]);
  

  // const handleSubmit = (e) => {
    
  //   if (Object.keys(category).length === 5) {
  //     axios
  //       .post(`${process.env.REACT_APP_BACKEND_URL}prices`, category)
  //       .then((res) => {
          
  //         if (res?.data?.upsertedId) {
  //           getData();
  //         } else {
  //           setError("Couldn't create Price Category");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }else{
  //     setError("Please Fill All the fields ");
  //   }
  // };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}prices`,{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
      
  };
  const getCommissionData = ()=>{
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}getComissionValues`,{
      headers:{
          "Authorization":token
      }
    })
    .then((res) => {
      setCommissionData(res.data);
      console.warn(res.data);
    })
    .catch((err) => console.log(err));

  }

  useEffect(() => {
    getData();
    getCommissionData();
  }, []);



  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error ? <Alert severity={errType} onClose={() => {setError()}}>{error}</Alert>: ""}
          </Grid>
          {/* <Grid item xs={12} md={2}>
            <TextField
              fullWidth

              size="small"
              label="Category Name"
              variant="outlined"
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              size="small"
              label="Lower Limit"
              variant="outlined"
              onChange={(e) =>
                setCategory({ ...category, lowerLimit: parseInt(e.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              size="small"
              label="Upper Limit"
              variant="outlined"
              onChange={(e) =>
                setCategory({ ...category, upperLimit: parseInt(e.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              size="small"
              label="Local Price"
              variant="outlined"
              onChange={(e) =>
                setCategory({ ...category, localPrice: parseInt(e.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              size="small"
              label="Out City Price"
              variant="outlined"
              InputProps={{
                min:0
              }}
              onChange={(e) =>
                setCategory({ ...category, outCityPrice: parseInt(e.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="outlined" size="small" fullWidth onClick={handleSubmit}>
              Add Price Category
            </Button>
          </Grid> */}
        </Grid>
        <Grid container alignContent="center">
          <Grid item xs={12} >
            {/* Grid Content */}
            <Grid
              container
              rowSpacing={1}
               
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid
                item
                
                
                xs={12}
                style={{ padding: 0, marginTop: "1rem", marginBottom: "1rem" }}
              >
                <Typography variant="h5">Set Prices</Typography>
              </Grid>
              {/* Labels */}
              
             
              
              <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                {data.map((data, ind) => (
                  <List
                      key={ind}
                      category={data.name + (data.name === "Height" ? " (in inch) " : data.name === "Weight" ? " (in kg) " : "") }
                      lowerLimit={data.lowerLimit}
                      upperLimit={data.upperLimit}
                      id={data._id}
                      getData={getData}
                      setError={setError} 
                      setErrType={setErrType} 
                      localPrice={data.localPrice}
                      outCityPrice={data.outCityPrice}
                    />
                ))}
              </Grid>
            <Grid container style={{justifyContent:"space-around"}}>
                <Typography variant="h5" align="center">Set Agent Commission</Typography>
                <CommissionCard title={"Fixed Charge Range (in KM)"} value={breakpoint} setBreakpoint={setBreakpoint} ind={0} setData={setCommissionData} setError={setError}/> 
                <CommissionCard title={`Fixed Charge (Below ${breakpoint || "0"} KM)`} value={commissionData?.belowBreakpoint} ind={1} setData={setCommissionData} setError={setError}/>
                <CommissionCard title={`Per KiloMeter Rate (Above ${breakpoint || "0"} KM)`} value={commissionData?.aboveBreakpoint} ind={2} setData={setCommissionData} setError={setError}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
