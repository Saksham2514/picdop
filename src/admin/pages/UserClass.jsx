import React from "react";
import { Component } from "react";
import "../../App.css";

// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "./DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import { Paper } from "@mui/material";
import UserFormClass from "./UserFormClass";
import axios from "axios";

export class UserClass extends Component {
  fetch = () => {
    let url = window.location.href;
    let str = url.split("/");
    let par = str.splice(-1)[0];
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/search`, {
          _id: par.toString(),
        })
        .then((res) => {
          this.setState({ details: res.data });
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    console.log(this.state.details);
    if (this.state.details !== undefined) {
      alert(this.state.details[0].name);
    } else {
      this.fetch();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      long: "",
      lat: "",
    };

    this.styles = {
      container: {
        paddingTop: "4rem",
        paddingBottom: "4rem",
      },
    };

    this.useEffect = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }

      function showPosition(position) {
        this.setState({ long: position.coords.latitude });
        this.setState({ lat: position.coords.longitude });
      }
    };
  }

  setStateOfParent = (details) => {
    this.setState({ details });
  };

  render() {
    return (
      <DashboardLayout>
        <Container maxWidth="lg" className={this.styles.container}>
          <Grid
            container
            spacing={2}
            style={{
              margin: "0.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={9}>
              <Paper
                style={{ padding: "1rem", borderRadius: "1rem" }}
                elevation={5}
              >
                {this.state.details === undefined ? ("Loading") : (<>
                <UserFormClass
                edit={this.state.edit}
                data={this.state.details[0]}
                setData={this.setStateOfParent}
              />
                </>)}
                
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
    );
  }
}
