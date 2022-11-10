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
import { Link } from "react-router-dom";
import NestedModal from "./Modal";

const ParcelForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const [fileArray, setFA] = useState(["https://source.unsplash.com/300x300"]);
  const [from, setType] = useState(10);
  const [to, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [paymentCollection, setCollection] = useState("");
  const [paymentOption, setMode] = useState("");
  const [description, setDesc] = useState(" \n \n \n \n ");

  return (
    <div>
      <Typography
        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
        variant="h6"
      >
        Order View
      </Typography>
      <Grid container fullWidth spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="From Email"
            value={from}
            variant="outlined"
            onChange={(e) => setWeight(e.target.value)}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            size="small"
            fullWidth
            label="To Email"
            value={to}
            variant="outlined"
            onChange={(e) => setWeight(e.target.value)}
            id="outlined-start-adornment"
          />
        </Grid>
        {/* LBH ROW */}

        <Grid item xs={12}>
          <Typography style={{ fontWeight: "bold" }} variant="h6">
            Parcel Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            size="small"
            fullWidth
            label="Weight"
            value={height}
            variant="outlined"
            onChange={(e) => setHeight(e.target.value)}
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
            value={length}
            variant="outlined"
            onChange={(e) => setLength(e.target.value)}
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
            value={length}
            variant="outlined"
            onChange={(e) => setLength(e.target.value)}
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
            value={width}
            variant="outlined"
            onChange={(e) => setWidth(e.target.value)}
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
            label="No. of Parcel  "
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            value={description}
            onChange={(e) => setDesc(e.target.value.trim())}
            variant="outlined"
          />
          <FormControl disabled size="small" fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">
              Payment Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentOption}
              label="Payment Mode"
              onChange={(event) => setMode(event.target.value)}
            >
              <MenuItem value={10}>Bank Account</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl disabled  fullWidth>
            <InputLabel id="demo-simple-select-label">
              Delivery Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentCollection}
              label="Parcel Payment Collection"
              onChange={(event) => setCollection(event.target.value)}
            >
              <MenuItem value={10}>yes</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl disabled  size="small" style={{marginTop:"0.75rem"}} fullWidth>
            <InputLabel id="demo-simple-select-label">
              Deliver Charge
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={paymentCollection}
              label="Parcel Payment Collection"
              onChange={(event) => setCollection(event.target.value)}
            >
              <MenuItem value={10}>yes</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
          <Link to="/collection" style={{ textDecoration: "none",borderRadius:"1rem" }}>
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
          >
            Regenerating OTP
          </Button>
        </Grid>
        <Grid  xs={12} md={3} style={{paddingTop:"0.5rem"}}>
<NestedModal/>
        </Grid>
         
      </Grid>
    </div>
  );
};

export default ParcelForm;
