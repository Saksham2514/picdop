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
import ImagePreview from "../../components/FrOriginal";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ParcelForm = ({ details, setDetails }) => {
  const { id } = useSelector((state) => state);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [parcelImage, setParcelImage] = useState([]);
  const [billImage, setBillImage] = useState([]);
  const requiredFields = [
    "from",
    "to",
    "parcelType",
    "parcelWeight",
    "createdBy",
    "parcelHeight",
    "parcelLength",
    "parcelWidth",
    "paymentMode",
    "parcelPaymentCollection",
  ];


const getPrice = () => {

    const weightFilter =
      details.parcelWeight < 1
        ? {name:"Weight", $and: [{ lowerLimit: 0 }, { upperLimit: 1 }] }
        : details.parcelWeight >= 1 && details.parcelWeight < 5
        ? {name:"Weight", $and: [{ lowerLimit: 1 }, { upperLimit: 5 }] }
        : details.parcelWeight >= 5 && details.parcelWeight < 10
        ? {name:"Weight", $and: [{ lowerLimit: 5 }, { upperLimit: 10 }] }
        : details.parcelWeight >= 10 && details.parcelWeight < 30
        ? {name:"Weight", $and: [{ lowerLimit: 10 }, { upperLimit: 30 }] }
        : { lowerLimit: 30 };

    const heightFilter =
      details.parcelHeight < 1
        ? {name:"Height", $and: [{ lowerLimit: 0 }, { upperLimit: 1 }] }
        : details.parcelHeight >= 1 && details.parcelHeight < 3
        ? {name:"Height", $and: [{ lowerLimit: 1 }, { upperLimit: 3 }] }
        : details.parcelHeight >= 3 && details.parcelHeight < 5
        ? {name:"Height", $and: [{ lowerLimit: 3 }, { upperLimit: 5 }] }
        : details.parcelHeight >= 5 && details.parcelHeight < 8
        ? {name:"Height", $and: [{ lowerLimit: 5 }, { upperLimit: 8 }] }
        : {name:"Height", $and: [{ lowerLimit: 8 }] };
  // console.log(weightFilter); 
  // console.log(heightFilter); 

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}prices/search`, {
        filters : {
          $or:[
          weightFilter,
          heightFilter
        ]
      },
      select: details.sameCity ? "localPrice -_id " : "outCityPrice -_id "
      })
      .then((res) => {
        const data = res.data
        const price = data[0].localPrice ? Math.max(data[0].localPrice, data[1].localPrice) :  Math.max(data[0].outCityPrice, data[1].outCityPrice);
        setDetails({...details,parcelPaymentCollection : price})
        
        // console.log(Math.max(Object.values(res.data)))
      })
      .catch((err) => console.log(err));
      
  };

  const handleSubmit = () => {
    // console.log(parcelImage);
    // console.log(billImage);
    // setDetails({ ...details, parcelImage: parcelImage });

    // setDetails({ ...details, "billImage": billImage });
    // setDetails({...details,"parcelImage":parcelImage,"billImage":billImage})
    const validate = Object.keys(details).map((data) =>
      requiredFields.includes(data) && data.length > 3 
    );
    // console.log(requiredFields.includes(Object.keys(details)));
    // console.log(validate);
    // console.log(details);

    if (validate.includes("false") || validate.length < 11) {
      setError("Please fill all the fields ");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}orders`, details)
        .then((res) => {
          if (res?.data?._message) {
            setError(res.data._message);
            // console.log(res.data);
          } else {
            // console.log(`${process.env.REACT_APP_BACKEND_URL}orders`);
            navigate("/collection");
          }
        })
        .catch((err) => {
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
              value={details.parcelType || ""}
              onChange={(e) => {
                setDetails({ ...details, parcelType: e.target.value.trim() });
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
              setDetails({
                ...details,
                parcelWeight: parseFloat(e.target.value) > 0 ?  e.target.value.trim() : 1,
                createdBy: id,
              });
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
              setDetails({ ...details, parcelHeight: e.target.value.trim() });
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
              setDetails({ ...details, parcelLength: e.target.value.trim() });
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
              setDetails({ ...details, parcelWidth: e.target.value.trim() });
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
              setDetails({
                ...details,
                parcelDescription: e.target.value.trim(),
              });
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
              value={details.paymentMode || "" }
              
              onChange={(e) => {
                setDetails({ ...details, paymentMode: e.target.value.trim() });
              }}
            >
              <MenuItem value={"Cash On Delivery"}>Cash On Delivery</MenuItem>
              <MenuItem value={"Prepaid"}>Prepaid</MenuItem>
              <MenuItem value={"Credit"}>Credit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Descritpion and payments mode ends */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={details.parcelPaymentCollection ? "" : "Amount to be collected "}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={details.parcelPaymentCollection}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImagePreview
            label="Bill Image"
            name="billImages"
            setDetails={setBillImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImagePreview
            label="Parcel Document"
            name="parcelImages"
            setDetails={setParcelImage}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
           color="primary"
            disabled={details.parcelWeight && details.parcelHeight ? getPrice() : true  }
            onClick={ async() => {
              await setDetails({
                ...details,
                parcelImages: parcelImage,
                billImages: billImage,
              });
              handleSubmit() ;
              
            }}
          >
            Book Delivery
          </Button>
          {/* <Button onClick={()=>{getPrice()}}>Get Price</Button> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default ParcelForm;
