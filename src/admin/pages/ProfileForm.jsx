import {
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import ImagePreview from "../../components/Fr";

const ParcelForm = (props) => {
  
  return (
    <div>
      <Grid container fullWidth spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            style={{ paddingBottom: "1rem", fontWeight: "bold" }}
            variant="h5"
            >
            {props.edit ? "Update" :" "} Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={()=>{props.setEdit(true)}} style={{float:"right"}}>Edit</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select 
            disabled={!props.edit}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.data[0].role}
              label={props.data[0].role ? "Role" : ""  }
              onChange={(e) => props.setDetails([...props.data[0], { role : e.target.value}])}
            >
              <MenuItem value={10}>Not Selected </MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
             disabled={!props.edit}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.data[0].category}
              label="Category"
             
              onChange={(e) => props.setDetails([...props.data[0], { category : e.target.value}])}
            >
              <MenuItem value={10}>Medicine </MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* NAme ROW */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            value={props.data[0].fname}
            variant="outlined"
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { fname : e.target.value}])}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={props.data[0].lname}
            variant="outlined"
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { lname: e.target.value}])}
            id="outlined-start-adornment"
          />
        </Grid>

        {/* NAme Row ends  */}
        {/* Contact ROW */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mobile Number"
            value={props.data[0].mobile}
            variant="outlined"
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { mobile : e.target.value}])}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            value={props.data[0].email}
            variant="outlined"
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { email : e.target.value}])}
            id="outlined-start-adornment"
          />
        </Grid>

        {/* Contact Row ends  */}
        {/* Address ROW */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            label="Shop Name"
            value={props.data[0].shopName}
            variant="outlined"
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { shopName: e.target.value}])}
            id="outlined-start-adornment"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          
            fullWidth
            maxRows={5}
            multiline
            label="Address"
            value={props.data[0].address}
            InputProps={{
              readOnly: !props.edit,
            }}
            onChange={(e) => props.setDetails([...props.data[0], { address : e.target.value}])}
            variant="outlined"
            id="outlined-start-adornment"
          />
        </Grid>

        {/* Address Row ends  */}
       
        <Grid item xs={12} md={6}>
          <ImagePreview label="Shop Image" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImagePreview label="Shop Document" />
        </Grid>
        <Grid item xs={12}>
        {props.edit ? (<Button
            variant="contained"
            size="small"
            onClick={()=>props.setEdit(false)}
            style={{
              color: "white",
              backgroundColor: "var(--main-color)",
              borderRadius: "0.25rem",
              paddingX: "1rem",
              textTransform: "capitalize",
            }}
          >
           Update
          </Button>
        ) : ("") }
          </Grid>
      </Grid>
    </div>
  );
};

export default ParcelForm;
