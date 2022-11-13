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
import ImagePreview from "../../components/Fr"

const ParcelForm = () => {
  const [parcelType, setType] = useState(10);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [paymentCollection, setCollection] = useState("");
  const [paymentMode, setMode] = useState("");
  const [description, setDesc] = useState(" \n \n \n \n ");

  return (
    <div>
      <Typography
        style={{ paddingBottom: "1rem", fontWeight: "bold" }}
        variant="h5"
      >
        Parcel Information
      </Typography>
      <Grid container fullWidth spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Parcel Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parcelType}
              label="Parcel Type"
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value={10}>Box</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          fullWidth
            label="Parcel Weight"
            value={weight}
            variant="outlined"
            onChange={(e) => setWeight(e.target.value)}
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
            value={height}
            variant="outlined"
            onChange={(e) => setHeight(e.target.value)}
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
            value={length}
            variant="outlined"
            onChange={(e) => setLength(e.target.value)}
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
            value={width}
            variant="outlined"
            onChange={(e) => setWidth(e.target.value)}
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
            value={description}
            onChange={(e) => setDesc((e.target.value).trim())}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl  fullWidth>
            <InputLabel id="demo-simple-select-label">Payment Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMode}
              label="Payment Mode"
              onChange={(event) => setMode(event.target.value)}
            >
              <MenuItem value={10}>Bank Account</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel id="demo-simple-select-label">Parcel Payment Collection</InputLabel>
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
        </Grid>
        {/* Descritpion and payments mode ends */}
        <Grid item xs={12} md={6}>
            <ImagePreview label="Bill Image"/>
        </Grid>
        <Grid item xs={12} md={6}>
            <ImagePreview label="Parcel Document"/>
        </Grid>
        <Grid item xs={12} >
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
                  >
                    Add Parcel Details
                  </Button>
        </Grid>

      </Grid>
    </div>
  );
};

export default ParcelForm;
