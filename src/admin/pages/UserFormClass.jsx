import { Grid, Button, TextField, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Component } from "react";
import ImagePreview from "../../components/Fr";
import NestedModal from "./Modal";
import LocationModal from "./LocationModal";
import { Link } from "react-router-dom";


export class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      details: {
        role: this.props.role,
        category: this.props.category,
        fname: this.props.fname,
        lname: this.props.lname,
        mobile: this.props.mobile,
        email: this.props.email,
        shopName: this.props.shopName,
        address: this.props.address,
      },
    };
  }

  render() {
    return (
      <div>
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
                value={this.state.details.role}
                label={this.state.details.role ? "Role" : ""}
                onChange={(e) => this.state.setData({ role: e.target.value })}
              >
                <MenuItem value={10}>Not Selected </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                value={this.state.details.category}
                label={this.state.details.category ? "Category" : ""}
                onChange={(e) => this.state.setDetails({ category: e.target.value })}
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
              size="small"
              fullWidth
              label={this.state.details.fname ? "First Name" : ""}
              value={this.state.details.fname}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ fname: e.target.value })}
              id="outlined-start-adornment"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label={this.state.details.lname ? "Last Name" : ""}
              value={this.state.details.lname}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ lname: e.target.value })}
              id="outlined-start-adornment"
            />
          </Grid>

          {/* NAme Row ends  */}
          {/* Contact ROW */}
          <Grid item xs={12} md={6}>
            <TextField
              multiline
              fullWidth
              maxRows={5}
              label="Shop Name"
              value={this.state.details.shopName}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Mobile Number"
              value={this.state.details.mobile}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ mobile: e.target.value })}
              style={{ marginBottom: "1.5rem" }}
              id="outlined-start-adornment"
            />
            <TextField
              size="small"
              fullWidth
              label="Email Address"
              value={this.state.details.email}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ email: e.target.value })}
              id="outlined-start-adornment"
            />
          </Grid>

          {/* Contact Row ends  */}
          {/* Address ROW */}
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Latitude"
              value={this.state.details.latitude}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ mobile: e.target.value })}
              style={{ marginBottom: "1.5rem" }}
              id="outlined-start-adornment"
            />
            <TextField
              size="small"
              fullWidth
              label="Longitude"
              value={this.state.details.longitude}
              variant="outlined"
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ email: e.target.value })}
              id="outlined-start-adornment"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              maxRows={5}
              multiline
              label="Address"
              value={this.state.details.address}
              InputProps={{
                readOnly: this.state.edit,
              }}
              onChange={(e) => this.state.setData({ address: e.target.value })}
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
            <LocationModal />
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
            <NestedModal label=" User" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProfileForm;
