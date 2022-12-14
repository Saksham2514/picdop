import { Grid, Button, TextField, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Component } from "react";
import ImagePreview from "../../components/Fr";
import NestedModal from "./Modal";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      role: this.props.data.role,
      category: this.props.data.category,
      subCategory: this.props.data.subCategory,
      name: this.props.data.name,
      shopName: this.props.data.shopName,
      shopNumber: this.props.data.shopNumber,
      contact: this.props.data.contact,
      email: this.props.data.email,
      line1: this.props.data.line1,
      line2: this.props.data.line2,
      city: this.props.data.city,
      state: this.props.data.state,
      mapsLink: this.props.data.mapsLink,
      pin: this.props.data.pin,
      navigate: false,
    };
    this.handleUpdate = () => {
      let url = window.location.href;
      let str = url.split("/");
      let par = str.splice(-1)[0];
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}users/${par}`,this.state)
        .then((res) => {
// console.log(res.data);
        }) 
        .catch((err) => console.log(err));
    };

    this.handleDelete = () => {
      let url = window.location.href;
      let str = url.split("/");
      let par = str.splice(-1)[0];
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}users/${par}`)
        .then((res) => {
          this.setState({ navigate: true });
        })
        .catch((err) => console.error(err));
    };
  
  }
  render() {
    return (
      <div>
        {this.state.navigate ? <Navigate to="/collection"></Navigate> : ""}
        <Grid container size="small" fullWidth spacing={3}>
          <Grid item xs={12}>
            <Typography
              style={{ paddingBottom: "1rem", fontWeight: "bold" }}
              variant="h5"
            >
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                disabled={this.state.edit}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.role}
                onChange={(e) => this.setState({ role: e.target.value })}
              >
                <MenuItem value={"admin"}>Admin </MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"agent"}>Agent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                disabled={this.state.edit}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <MenuItem value={10}>Medicine </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sub Category
              </InputLabel>
              <Select
                disabled={this.state.edit}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.subCategory}
                onChange={(e) => this.setState({ subCategory: e.target.value })}
              >
                <MenuItem value={10}>Medicine </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={50}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* NAme ROW */}
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label=" Name"
              value={this.state.name}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              id="outlined-start-adornment"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </Grid>

          {/* NAme Row ends  */}
          {/* Contact ROW */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Shop Name"
              value={this.state.shopName}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ shopName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Shop Number"
              value={this.state.shopNumber}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ shopNumber: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Mobile Number"
              value={this.state.contact}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              style={{ marginBottom: "1.5rem" }}
              id="outlined-start-adornment"
              onChange={(e) => this.setState({ contact: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Email Address"
              value={this.state.email}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ email: e.target.value })}
              id="outlined-start-adornment"
            />
          </Grid>

          {/* Contact Row ends  */}
          {/* Address ROW */}

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Line 1 "
              value={this.state.line1}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ line1: e.target.value })}
              variant="outlined"
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Line 2"
              value={this.state.line2}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ line2: e.target.value })}
              variant="outlined"
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Maps Link "
              value={this.state.mapsLink}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ mapsLink: e.target.value })}
              variant="outlined"
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              maxRows={5}
              multiline
              label="City"
              value={this.state.city}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ city: e.target.value })}
              variant="outlined"
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              maxRows={5}
              multiline
              label="State"
              value={this.state.state}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ state: e.target.value })}
              variant="outlined"
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              maxRows={5}
              multiline
              label="PINCODE"
              value={this.state.pin}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.setState({ pin: e.target.value })}
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
              onClick={this.handleUpdate}
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
              Save Details
            </Button>
          </Grid>
          <Grid xs={12} md={3} style={{ paddingTop: "0.5rem" }}>
            <NestedModal label=" User" handleDelete={this.handleDelete} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProfileForm;
