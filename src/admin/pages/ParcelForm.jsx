import {
  Grid,
  InputAdornment,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import ImagePreview from "../../components/Fr";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ParcelForm = ({ details, setDetails}) => {
  const { id } = useSelector((state) => state);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(details);

    if (Object.keys(details).length < 11) {
      console.log(Object.keys(details).length );
      setError("Please fill all the fields ");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}orders`, details)
        .then((res) => {
          console.log(`${process.env.REACT_APP_BACKEND_URL}orders`);
          console.log(res.data);
          navigate("/collection");
        })
        .catch((err) => {
          console.log("Printing error");
          console.log(err);
          setError(err.message);
        });
        
    }
    
  };

  return (
    <div>
      <Typography
        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
        variant="h5"
      >
        Parcel Information
      </Typography>
      {error ? (
        <>
          <Alert
            style={{ marginBottom: "1rem" }}
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => setError()}>
                &#x2715;
              </Button>
            }
          >
            {error}
          </Alert>
        </>
      ) : (
        <></>
      )}

      <Grid container fullWidth spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Parcel Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Parcel Type"
              // onChange={(event) => setType(event.target.value)}
              onChange={(e) => {
                setDetails({ ...details, parcelType: e.target.value });
              }}
            >
              <MenuItem value={"Box"}>Box</MenuItem>
              <MenuItem value={"Polythene"}>Polythene</MenuItem>
              <MenuItem value={"Looose"}>Loose</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Parcel Weight"
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelWeight: e.target.value , createdBy: id });
            }}
            id="outlined-start-adornment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* LBH ROW */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Parcel Height"
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelHeight: e.target.value });
            }}
            id="outlined-start-adornment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">inch</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Parcel Length"
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelLength: e.target.value });
            }}
            id="outlined-start-adornment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">inch</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Parcel Width"
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelWidth: e.target.value });
            }}
            id="outlined-start-adornment"
            InputProps={{
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
            label="Parcel Description"
            multiline
            fullWidth
            maxRows={10}
            onChange={(e) => {
              setDetails({ ...details, parcelDescription: e.target.value });
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Payment Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Payment Mode"
              onChange={(e) => {
                setDetails({ ...details, paymentMode: e.target.value });
              }}
            >
              <MenuItem value={"Cash On Delivery"}>Cash On Delivery</MenuItem>
              <MenuItem value={"Prepaid"}>Prepaid</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
            </Select>
          </FormControl>
          
        </Grid>
        {/* Descritpion and payments mode ends */}
        <Grid item xs={12} >
        <TextField
            fullWidth
            label="Amount to be collected "
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelPaymentCollection: e.target.value });
            }}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImagePreview label="Bill Image" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImagePreview label="Parcel Document" />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            style={{
              color: "white",
              backgroundColor: "var(--main-color)",
              borderRadius: "0.25rem",
              margin: "1rem 0",
              paddingX: "1rem",
              textTransform: "capitalize",
            }}
            disabled={false}
            onClick={handleSubmit}
          >
            Book Delivery
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParcelForm;
