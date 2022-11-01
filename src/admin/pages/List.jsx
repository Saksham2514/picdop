import * as React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useState } from "react";

export default function CheckboxList(props) {
  const [local, setLocal] = useState(props.localPrice);
  const [outCity, setOutCity] = useState(props.outCityPrice);

  return (
    
      <Grid container style={{backgroundColor:"white",marginTop:0,paddingTop:"0rem",margin:"1rem 0"}}>
        <Grid style={{margin:0,padding:"0.5rem"}} item xs={3}>
          <p style={{ fontWeight: "bold",paddingLeft:"0.5rem" }}>{props.category}</p>
        </Grid>
        <Grid style={{margin:0,padding:"0.5rem",}} item xs={3}>
          <p style={{ fontWeight: "bold" }}>{props.limit}</p>
        </Grid>
        <Grid style={{margin:0,paddingTop:"0.75rem",}} item xs={3}>
          <TextField 
            variant="outlined"
            size="small"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </Grid>
        <Grid style={{margin:0,paddingTop:"0.75rem",}} item xs={3}>
          <TextField
            variant="outlined"
            size="small"
            value={outCity}
            onChange={(e) => setOutCity(e.target.value)}
          />
        </Grid>
      </Grid>
    
  );
}
