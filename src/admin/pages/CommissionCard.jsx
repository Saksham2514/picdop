import { Button, Grid } from "@material-ui/core";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommissionCard = ({
  title,
  value,
  setBreakpoint,
  ind,
  setData,
  setError,
}) => {
  const [inputValue, setInputValue] = useState(0);
  const { token } = useSelector((state) => state);
  const [update, setUpdate] = useState(true);

  let updateObject;

  if (ind == 0) {
    updateObject = { breakpoint: parseInt(inputValue) };
  } else if (ind == 1) {
    updateObject = { belowBreakpoint: parseInt(inputValue) };
  } else {
    updateObject = { aboveBreakpoint: parseInt(inputValue) };
  }

  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}updateComission`,
        updateObject,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res?.data) {
          setUpdate(true);
          setData(res.data);
        } else setError("Couldn't Update Commission");
      })
      .catch((err) => setError("Couldn't Update Commission"));
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
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
        <Grid item xs={12} sm={6}>
          <p style={{ fontWeight: "bold" }}>{title}</p>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => {
              setUpdate(false);
              setInputValue(e.target.value);
              if (ind == 0) {
                setBreakpoint(e.target.value);
              }
            }}
            type="number"
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
      </Grid>
    </Grid>
  );
};

export default CommissionCard;
