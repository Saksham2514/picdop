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
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateWallet } from "../../redux/slice";

const ImgDisplay = ({ billImage, setLoading }) => {
  return(
    <Grid item xs={12} md={6} key={Math.random()}>
    <Button
      key={Math.random()}
      variant="contained"
      color="primary"
      onClick={() => {
        setLoading(false);
      }}
      >
      Select different files
    </Button>

    <div
      key={Math.random()}
      style={{
        marginTop: "1rem",
        display: "flex",
        gap: 10,
        overflowX: "auto",
      }}
      >
      {billImage?.map((e, i) => (
        <>
          <img src={e} height={150} alt="Images" key={i} />
        </>
      ))}
    </div>
  </Grid>
);}
const ParcelForm = ({ details, setDetails }) => {  
  const dispatch = useDispatch()
  const { id,role,wallet,token } = useSelector((state) => state);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [loadingP, setloadingP] = useState(false);
  const [parcelImage, setParcelImage] = useState([]);
  const [billImage, setBillImage] = useState([]);
  const [clicked, setClicked] = useState(false)
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

  // const handleBillImages = async (e) => {
  //   const urls = [];

  //   for (let i = 0; i < e.target.files.length; i++) {
  //     let img = await fileToDataUri(e.target.files[i]);
  //     urls.push(img.base64);
  //   }
  //   await setBillImage(urls);
  //   await setDetails({ ...details, billImages: urls });
  //   setloading(true);
  //   console.log(urls);
  // };

  const handleParcelImage = async (e) =>{
    const urls = [];

    for (let i = 0; i < e.target.files.length; i++) {
      await fileToDataUri(e.target.files[i]).then(res=>{
        urls.push(res.base64);
        setParcelImage(prevState =>({...prevState,urls}));        
      }).then(setDetails(prevState => ({ ...prevState, parcelImages: urls }))).then(setloadingP(true));
    }
  }
  const handleBillImage = async (e) =>{
    const urls = [];

    for (let i = 0; i < e.target.files.length; i++) {
      await fileToDataUri(e.target.files[i]).then(res=>{
        urls.push(res.base64);
        setBillImage(prevState =>({...prevState,urls}));        
      }).then(setDetails(prevState => ({ ...prevState, billImages: urls }))).then(setloading(true));
    }
  }

  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener("load", () => {
        res({
          base64: reader.result,
          name: name,
          type,
          size: size,
        });
      });
      reader.readAsDataURL(image);
    });
  };

  const getPrice = () => {
    const weightFilter =
      details?.parcelWeight < 1 && details.parcelWeight > 0
        ? { name: "Weight", $and: [{ lowerLimit: 0 }, { upperLimit: 1 }] }
        : details.parcelWeight >= 1 && details.parcelWeight < 5
        ? { name: "Weight", $and: [{ lowerLimit: 1 }, { upperLimit: 5 }] }
        : details.parcelWeight >= 5 && details.parcelWeight < 10
        ? { name: "Weight", $and: [{ lowerLimit: 5 }, { upperLimit: 10 }] }
        : details.parcelWeight >= 10 && details.parcelWeight < 30
        ? { name: "Weight", $and: [{ lowerLimit: 10 }, { upperLimit: 30 }] }
        : details.parcelWeight >= 30 
        ? { name: "Weight", $and: [{ lowerLimit: 30 }] }
        : { name: "Weight", $and: [{ lowerLimit: 0 }, { upperLimit: 0 }] }
    
    const heightFilter =
      details?.parcelHeight < 1 && details.parcelHeight > 0
        ? { name: "Height", $and: [{ lowerLimit: 0 }, { upperLimit: 1 }] }
        : details.parcelHeight >= 1 && details.parcelHeight < 3
        ? { name: "Height", $and: [{ lowerLimit: 1 }, { upperLimit: 3 }] }
        : details.parcelHeight >= 3 && details.parcelHeight < 5
        ? { name: "Height", $and: [{ lowerLimit: 3 }, { upperLimit: 5 }] }
        : details.parcelHeight >= 5 && details.parcelHeight < 8
        ? { name: "Height", $and: [{ lowerLimit: 5 }, { upperLimit: 8 }] }
        : details.parcelHeight >= 5 && details.parcelHeight < 8
        ? { name: "Height", $and: [{ lowerLimit: 8 }] }
        : { name: "Height", $and: [{ lowerLimit: 0 }, { upperLimit: 0 }] }
        
    // console.log(weightFilter);
    // console.log(heightFilter);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}prices/search`, {
        filters: {
          $or: [weightFilter, heightFilter],
        },
        select: details.sameCity ? "localPrice -_id " : "outCityPrice -_id ",
      },{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
        const data = res.data;
        console.log(data[0]);
        const price = data[0].localPrice != undefined
          ? Math.max(data[0].localPrice, data[1].localPrice)
          : Math.max(data[0].outCityPrice, data[1].outCityPrice);
        setDetails({ ...details, parcelPaymentCollection: price });
        console.log(price);

      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
  
    console.log(role);
    // return;
    if(clicked){
      return;
    }else{
      setClicked(true);
    }

    if(wallet<details.parcelPaymentCollection && role != "admin"){
        setClicked(false)
        return setError("Insufficient amount in wallet");
        
      }
      const validate = Object.keys(details).map(
        (data) => requiredFields.includes(data)
        );
    
    if (validate.includes("false") || validate.length < 9) {
      setError("Please fill all the fields ");
      setClicked(false)
    } else {
      
      const preDetails = {...details, role: role,userID:id }
      
      const data =
        billImage.length > 0 && parcelImage.length > 0
          ? { preDetails, billImages: billImage, parcelImages: parcelImage }
          : billImage.length > 0 && parcelImage.length === 0
          ? { preDetails, billImages: billImage, parcelImages: parcelImage }
          : billImage.length === 0 && parcelImage.length > 0
          ? { preDetails, billImages: billImage, parcelImages: parcelImage }
          : preDetails;
          console.log(preDetails);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}orders`, data,{
          headers:{
              "Authorization":token
          }
        })
        .then((res) => {
          if (res?.data?._message) {
            setError(res.data._message);
          } else {
            if(role!="admin"){
              const wal = wallet - details.parcelPaymentCollection;
              dispatch(updateWallet({ wallet: res.data.wallet}));
            }
            navigate('/collection');
          }
          setClicked(false)
        })
        .catch((err) => {
          setClicked(false)
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
            <InputLabel id="demo-simple-select-label">Parcel Type*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Parcel Type*"
              value={details.parcelType || ""}
              onChange={(e) => {
                setDetails((curr)=>{
                  return { ...curr, parcelType: e.target.value.trim() }
                });
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
            label="Parcel Weight*"
            variant="outlined"
            onChange={(e) => {
              setDetails({
                ...details,
                parcelWeight:
                  parseFloat(e.target.value) > 0 ? e.target.value.trim() : 1,
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
            label="Parcel Height*"
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
            label="Parcel Length*"
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
            label="Parcel Width*"
            variant="outlined"
            onChange={(e) => {
              setDetails({ ...details, parcelWidth: e.target.value.trim() });
            }}
            onBlur={getPrice}
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
              label="Payment Mode*"
              value={details.paymentMode ?  "" : details.paymentMode }
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
            label={
              details.parcelPaymentCollection ? "" : "Amount to be collected"
            }
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={details.parcelPaymentCollection}
            id="outlined-start-adornment"
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <ImagePreview
            label="Bill Image*"
            name="billImages"
            setDetails={setBillImage}
          />
        </Grid> */}

        {loading ? (
          <ImgDisplay billImage={details.billImages} setLoading={setloading} />
        ) : (
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Bill Image</Typography>
            <input
              type="file"
              title="This is title"
              multiple
              onChange={handleBillImage}
            />
          </Grid>
        )}

        {/* <Grid item xs={12} md={6}>
          <ImagePreview
            label="Parcel Document*"
            name="parcelImages"
            setDetails={setParcelImage}
          />
        </Grid> */}
        {loadingP ? (
          <ImgDisplay billImage={details.parcelImages} setLoading={setloadingP} />
        ) : (
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Parcel Images</Typography>

            <input type="file" multiple onChange={handleParcelImage} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={
            details.parcelPaymentCollection > 0 ? false : true
            }
            onClick={() => {
             
                  handleSubmit();
             
              
            }}
          >
            {clicked?"loading...":"Book Delivery"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParcelForm;
