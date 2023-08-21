import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MediaControlCard({ data, getData }) {
  const [otp, setOtp] = useState(0);
  const [loading, setloading] = useState(true);
  const [from, setFrom] = useState([]);
  const [error, setError] = useState(false);
  const [to, setTo] = useState([]);
  const date = new Date(data.createdAt.toString());

  const { id, name } = useSelector((state) => state);

  const handleAccept = () => {
    if (otp.trim() === data.otp.toString()) {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}orders/${data._id}`, {
          agentId: id,
          agentName: name,
          status: "Accepted",
          pickupDate: new Date(),
        })
        .then((res) => {
          getData();
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
      .then(res=>setloading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <>{"loading "}</>
      ) : (
        <>
          <Card elevation={3} sx={{ borderRadius: "1rem", padding: "0.5rem" }} >
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
                <Grid item xs={12} >
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    From - {from?.name}
                  </Typography>
                  <Typography color="text.caption1" gutterBottom>
                    {from?.line1 +
                      " , " +
                      from?.line2 +
                      " , " +
                      from?.city +
                      " , " +
                      from?.state +
                      " - " +
                      from?.pin}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Contact
                  </Typography>
                  <a href={`tell:${from?.contact}`}>{from?.contact}</a>
                </Grid>
                <Grid item xs={12} >
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    color="text.secondary"
                    gutterBottom
                    align="right"
                  >
                    To - {to?.name}
                  </Typography>
                  <Typography color="text.caption1" gutterBottom align="right">
                    {to?.line1 +
                      " , " +
                      to?.line2 +
                      " , " +
                      to?.city +
                      " , " +
                      to?.state +
                      " - " +
                      to?.pin}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    color="text.secondary"
                    gutterBottom
                    align="right"
                  >
                    Contact
                  </Typography>

                  <Typography color="text.caption1" gutterBottom align="right">
                    <a href={`tell:${to?.contact}`}>{to?.contact}</a>
                  </Typography>
                </Grid>
              </Grid>
          
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign="right">
                  <TextField
                    variant="standard"
                    label="Enter OTP "
                    size="small"
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                    InputProps={{ inputProps: { min: 100000, max: 999999 } }}
                  />
                </Grid>
                <Grid item xs={8} >
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {date.getFullYear()} / {date.getMonth() + 1} /{" "}
                    {date.getDate()}
                  </Typography>
                </Grid>

                <Grid item xs={4} >
                  <Button
                    onClick={handleAccept}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{ float: "right" }}
                    disabled={otp.length === 6 ? false : true}
                  >
                    Accept
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
