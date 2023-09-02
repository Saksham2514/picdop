import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const TypeAhead = (props) => {
  const options = [];
  const [inputValue, setInputValue] = React.useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/search`,{
        $not : [{role:"agent"}]
      })
      .then((res) => {setUsers(res.data);console.log(res.data)})
      .catch((err) => alert(err));
  }, []);

  for (let x of users) {
    options.push(`${x.contact} - ${x.name} from ${x.shopName}`);
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
            // console.log(users.filter((data)=> data.contact === s.trim())[0].city);
              props.setFrom(users.filter((data)=> data.contact === s.trim())[0]._id)
              props.setCity(users.filter((data)=> data.contact === s.trim())[0].city)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
    />
  );
};
