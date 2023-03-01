import { Grid, Button, TextField, Typography } from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Component } from "react";
import ImagePreview from "../../components/Fr";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";

export class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ["error", ""],
      edit: false,
      loading: true,
      role: this.props.data.role,
      category: this.props.data.category,
      subCategory: this.props.data.subCategory,
      name: this.props.data.name,
      shopName: this.props.data.shopName,
      shopNumber: this.props.data.shopNumber,
      shopImages: this.props.data.shopImages,
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
    this.handleLoad = (val) => {
      this.setState({ loading: val });
    };

    this.handleBillImage = async (e) => {
      const urls = [];

      for (let i = 0; i < e.target.files.length; i++) {
        await this.fileToDataUri(e.target.files[i])
          .then((res) => {
            urls.push(res.base64);
            this.setState({shopImages: urls });
          })
          .then(
            this.setState({shopImages: urls })
          )
          .then(this.handleLoad(true));
      }
    };

    this.fileToDataUri = (image) => {
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

    this.handleUpdate = () => {    
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}users/${this.props.data._id}`, this.state)
        .then((res) => {
          if (res?.data?._id) {
            this.setState({
              error: ["success", "Updated Successfully"],
            });
          } else {
            this.setState({
              error: ["error", "Could not update details. Try Again Later"],
            });
          }
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

          <Grid item xs={6}>
            <Typography
              style={{ paddingBottom: "1rem", fontWeight: "bold" }}
              variant="h5"
            >
              Profile
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
          <Button onClick={()=>{this.setState({edit:!this.state.edit})}}>{!this.state.edit ? "Disable Edit"  : "Edit"}</Button>
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
                <MenuItem value={"Medical"}>Medical </MenuItem>
                <MenuItem value={"Groceries"}>Groceries</MenuItem>
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
                <MenuItem value={"Wholeseller"}>Wholeseller </MenuItem>
                <MenuItem value={"Retailler"}>Retailler</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* NAme ROW */}
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              label="Name"
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
          {this.state.loading ? (
            <ImgDisplay
              billImage={this.state.shopImages}
              setLoading={this.handleLoad}
            />
          ) : (
            <Grid item xs={12} >
              <Typography variant="subtitle2">Shop Images</Typography>
              <input
                type="file"
                title="This is title"
                multiple
                onChange={this.handleBillImage}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Link
              to="/collection"
              style={{ textDecoration: "none", borderRadius: "1rem" }}
            >
              <Button 
               variant="outlined"
               color="primary"
               size="small"
              >
                Back To Dashboard
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} textAlign={"right"}>
            <Button
              onClick={this.handleUpdate}
              variant="outlined"
              size="small"
              color="success"
              disabled={this.state.edit}
              
            >
              Save Details
            </Button>
          </Grid>
          {this.state.error[1]  ?  (<>
          <Grid item xs={12}>
            <Alert severity={this.state.error[0]} onClose={() => {this.setState({error:["error",""]})}}>
              {this.state.error[1]}
            </Alert>
          </Grid>
          </>) : (<></>)} 
        </Grid>
      </div>
    );
  }
}

export default ProfileForm;


const ImgDisplay = ({ billImage, setLoading }) => {
  return (
    <Grid item xs={12} key={Math.random()}>
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
        {!billImage ? (
          <>
            <p>No Images Uploaded</p>
          </>
        ) : (
          billImage?.map((e, i) => (
            <>
              <img src={e} height={150} alt="Images" key={i} />
            </>
          ))
        )}
      </div>
    </Grid>
  );
};