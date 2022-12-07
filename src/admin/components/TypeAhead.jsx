import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const TypeAhead = (props) => {
  const options = [];
  const [inputValue, setInputValue] = React.useState('');
  const [users, setUsers] = useState([]);
  console.log(`${process.env.REACT_APP_BACKEND_URL}users`);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users`)
      .then((res) => setUsers(res.data))
      .catch((err) => alert(err));
  }, []);

  for (let x of users) {
    // console.log(x.name);
    options.push(`${x._id} - ${x.name} from ${x.shopName}`);
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      fullWidth
      sx={{
        input: { color: "white" },
        "& .MuiInputLabel-root": { color: "white" }, //styles the label
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            color: "white",
            borderColor: "white",
          },
        },
        "&:focus .MuiInputLabel-root": { color: "white" }, //styles the label
        "&:focus .MuiOutlinedInput-root": {
          "&:focus > fieldset": {
            color: "white",
            borderColor: "white",
          },
        },
        "&:active .MuiInputLabel-root": { color: "white" }, //styles the label
        "&:active .MuiOutlinedInput-root": {
          "&:active > fieldset": {
            color: "white",
            borderColor: "white",
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          />
          )}
          onChange={(event, newValue) => {
            const s = newValue.split("-")[0];
              props.setFrom(s.trim())
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
    />
  );
};
