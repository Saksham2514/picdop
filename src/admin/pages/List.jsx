import * as React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function CheckboxList(props) {
  const [local, setLocal] = useState(props.localPrice);
  const [outCity, setOutCity] = useState(props.outCityPrice);
  const [update, setUpdate] = useState(true);
  const { token } = useSelector((state) => state);

  // const classes = useStyles();
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}prices/${props.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res?.data) {
          props.getData();
        } else {
          props.setError("Couldn't create Price Category");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}prices/${props.id}`,
        {
          localPrice: local,
          outCityPrice: outCity,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res?.data) {
          props.getData();
          setUpdate(true);
          props.setErrType("success");
          props.setError("Updated");
        } else {
          props.setError("Couldn't create Price Category");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid
      container
      style={{
        backgroundColor: "white",
        marginTop: 0,
        paddingTop: "0rem",
        margin: "1rem 0",
      }}
      spacing={3}
    >
      <Grid item xs={12} sm={2}>
        <p
          style={{
            fontWeight: "bold",
            paddingLeft: "0.5rem",
            textAlign: "center",
          }}
        >
          {props.category}
        </p>
      </Grid>
      <Grid item xs={6} sm={2}>
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          {props.lowerLimit}
        </p>
      </Grid>
      <Grid item xs={6} sm={2}>
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          {props.upperLimit}
        </p>
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
            setUpdate(false);
          }}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={outCity}
          onChange={(e) => {
            setOutCity(e.target.value);
            setUpdate(false);
          }}
        />
      </Grid>
      <Grid item xs={6} sm={2} style={{ textAlign: "center" }}>
        {/* <Button variant="outlined" color="error"  onClick={handleDelete}>Delete</Button> */}
        <Button
          variant="outlined"
          color="info"
          disabled={update}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Grid>
      {/* <Grid  item xs={2} style={{textAlign:"center"}}>
          <Button variant="outlined" color="error">Delete</Button>
        </Grid> */}
    </Grid>
  );
}
