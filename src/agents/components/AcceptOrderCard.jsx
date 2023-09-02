import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions, Chip, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateWallet } from "../../redux/slice";


export default function MediaControlCard({ data, key, removeCard }) {
  const dispatch = useDispatch();
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const date = new Date(data.createdAt.toString());
  
 
  const handleAccept = () => {
    console.log(data.otp.toString());
    if (otp.trim() === data.otp.toString()) {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}orders/${data._id}`, {
          status: "Completed",
          deliveryDate: new Date()
        })
        .then((res) => {
          dispatch(updateWallet({wallet:res.data.wallet}));
          removeCard(data._id);
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/search`, {
        $or: [{ _id: data.from }, { _id: data.to }],
      })
      .then((res) => {
        if (res.data[0]._id === data.from) {
          setFrom(res.data[0]);
          setTo(res.data[1]);
        } else {
          setFrom(res.data[1]);
          setTo(res.data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: "1rem", padding: "0.5rem" }}
      key={key}
    >
      {error ? (
        <Alert
          severity="error"
          onClose={() => {
            setError(false);
          }}
        >
          Invalid OTP
        </Alert>
      ) : (
        ""
      )} 
      <CardContent>
        <Grid container>
        <Grid item xs={12} textAlign="center">
                <Chip variant="outlined" label={data.status} color={data.status ==="Accepted" ? "info" : "success"}  />
          </Grid>
          <Grid item xs={6} >
            <Typography color="text.secondary" gutterBottom>
              From - {from.name}
            </Typography>
            <Typography color="text.caption1" gutterBottom>
              {from.line1 +
                " , " +
                from.line2 +
                " , " +
                from.city +
                " , " +
                from.state +
                " - " +
                from.pin}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Contact
            </Typography>
            <a href={`tell:${from.contact}`}>{from.contact}</a>
          </Grid>
          
          <Grid item xs={6} >
            <Typography color="text.secondary" gutterBottom align="right">
              To - {to.name}
            </Typography>
            <Typography color="text.caption1" gutterBottom align="right">
              {to.line1 +
                " , " +
                to.line2 +
                " , " +
                to.city +
                " , " +
                to.state +
                " - " +
                to.pin}
            </Typography>
            <Typography color="text.secondary" gutterBottom align="right">
              Contact
            </Typography>

            <Typography color="text.caption1" gutterBottom align="right">
              <a href={`tell:${to.contact}`}>{to.contact}</a>
            </Typography>
          </Grid>
          {data.status !== "Completed" ? (<>
         
          <Grid item xs={12} textAlign="right" marginTop={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter OTP "
              size="small"
              type="number"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              InputProps={{ inputProps: { min: 100000, max: 999999 } }}
            />
          </Grid>
          </>) : (<>
          <Grid item xs={6}>
            <Typography variant="body1">Delivered at : </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{new Date(data.deliveryDate).toLocaleString("en-US",{timeZone:"Asia/Kolkata"})} </Typography>
          </Grid>
          </>)}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleAccept}
              variant="outlined"
              color="success"
              size="small"
              sx={{ float: "right" }}
              disabled={otp.length === 6 ? false : true}
            >
              Delivered
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
