import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Alert, Button, CardActions, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MediaControlCard({ data, key,getData }) {
  const theme = useTheme();
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const date = new Date(data.createdAt.toString());
  const { id, name } = useSelector((state) => state);
  const handleAccept = () => {
    if (otp.trim() === data.otp.toString()) {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}orders/${data._id}`, {
          status: "Completed",
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={6} marginTop={1}>
            <Typography variant="body2">Enter OTP</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              size="small"
              type="number"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              InputProps={{ inputProps: { min: 100000, max: 999999 } }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {date.getFullYear()} / {date.getMonth()} / {date.getDate()}
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
