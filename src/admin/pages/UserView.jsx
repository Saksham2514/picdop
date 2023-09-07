import {
  Grid,
  InputAdornment,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NestedModal from "./Modal";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ParcelForm = ({ id }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [fileArray, setFA] = useState(["https://source.unsplash.com/300x300"]);
  const { token } = useSelector((state) => state);
const navigate = useNavigate();
  const fetch = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}orders/${id}`,{
          headers:{
              "Authorization":token
          }
        })
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);


  const handleRegenerate = ()=>{
    let otp = Math.floor(Math.random()*999999)+100000
    axios.put(`${process.env.REACT_APP_BACKEND_URL}orders/${id}`,
    {"otp":otp},{
      headers:{
          "Authorization":token
      }
    }).then(fetch()).catch(err=>console.error(err))
  }
  const handleDelete = ()=>{
    
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}orders/${id}`,{
      headers:{
          "Authorization":token
      }
    }
    ).then(navigate('/collection')).catch(err=>console.error(err))
  }

  return loading ? (
    <>
      <Typography variant="body"> Loading</Typography>
    </>
  ) : (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            style={{ paddingBottom: "1rem", fontWeight: "bold" }}
            variant="h6"
          >
            Order View
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography style={{ fontWeight: "bold" }} variant="h6">
            OTP is : {data.otp}
          </Typography>
        </Grid>
      </Grid>
      <Grid container fullWidth spacing={3}>
        {/* LBH ROW */}

        <Grid item xs={12} md={3}>
          <TextField
            size="small"
            fullWidth
            label="Weight"
            value={data.parcelWeight}
            variant="outlined"
            id="outlined-start-adornment"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            size="small"
            fullWidth
            label="Length"
            value={data.parcelLength}
            variant="outlined"
            id="outlined-start-adornment"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="start">inch</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            size="small"
            fullWidth
            label="Width"
            value={data.parcelWidth}
            variant="outlined"
            id="outlined-start-adornment"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="start">inch</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            size="small"
            fullWidth
            label="Height"
            value={data.parcelHeight}
            variant="outlined"
            id="outlined-start-adornment"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="start">inch</InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* LBH ROW ends  */}
        {/* Descritpion and payments mode  */}
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-multiline-flexible"
            label="Description"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            value={data.parcelDescription}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        {/* Descritpion and payments mode ends */}
        <Grid item xs={12} md={6}>
          {(fileArray || []).map((url) => (
            <>
              <img
                src={url}
                alt="..."
                height={100}
                width={100}
                style={{ border: "1px solid black" }}
              />
              <br />
            </>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {(fileArray || []).map((url) => (
            <>
              <img
                src={url}
                alt="..."
                height={100}
                width={100}
                style={{ border: "1px solid black" }}
              />
              <br />
            </>
          ))}
        </Grid>
        <Grid item xs={12} md={8}>
          <Link
            to="/collection"
            style={{ textDecoration: "none", borderRadius: "1rem" }}
          >
            <Button
              style={{ backgroundColor: "var(--main-color)", color: "white" }}
            >
              Back To Dashboard
            </Button>
          </Link>
          <Button
            variant="contained"
            size="small"
            style={{
              borderRadius: "0.25rem",
              color: "white",
              backgroundColor: "var(--success-color)",
              margin: "1rem 0.25rem",
              paddingX: "1rem",
              textTransform: "capitalize",
            }}
            onClick={()=>{handleRegenerate();fetch()}}
          >
            Regenerating OTP
          </Button>
        </Grid>
        <Grid xs={12} md={3} style={{ paddingTop: "0.5rem" }}>
          <NestedModal label="Delete Order" handleDelete={handleDelete}>
            <h3 style={{ textAlign: "center" }} id="parent-modal-description">
              Are Your Sure?
            </h3>
            <h3 style={{ textAlign: "center" }} id="parent-modal-description">
              This order will be deleted
            </h3>
          </NestedModal>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParcelForm;
