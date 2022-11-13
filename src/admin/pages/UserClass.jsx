import React from "react";
import { Component } from "react";
import "../../App.css";

// import DashboardLayout from "./DashboardLayout";
import DashboardLayout from "./DashboardLayout";
import { Container, Grid } from "@material-ui/core";
import { Paper } from "@mui/material";
import UserFormClass from "./UserFormClass";

export class UserClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      long: "",
      lat: "",
      details: {
        role: 10,
        category: 10,
        fname: "Brandon",
        lname: "Surname",
        mobile: "098765432",
        email: "support@brandon.co.in",
        shopName: "Brandon\n\n\n",
        address: "Online\n\n\n",
      },
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
    this.setState({details});
  }

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
                <UserFormClass
                  edit={this.state.edit}
                  data={this.state.details}
                  setData={this.setStateOfParent}

                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
    );
  }
}
