import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControl ,
  InputLabel ,
  OutlinedInput,
  InputAdornment,
    
  Button,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp';
import Fr from './Fr'

const Form = ({ disabled }) => {
  const [activeClass, setActive] = React.useState("");
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  
  return (
    <div>
      <Grid
        sx={{ p: 1 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* Row 1  */}

        {/* Row 2  */}
        <Grid item xs={12}>
          <Accordion
            disabled={disabled}
            onChange={(e, expanded) => {
              if (expanded) {
                setActive("active");
              } else {
                setActive("");
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={`counter ${activeClass}`}></div>
              <Typography>Shop Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Shop Name"
                    defaultValue=""
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    required
                    id="outlined-required"
                    label="Shop Number"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container sx={{mt:1}}>
                <Grid item xs={6}>
                <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Location</InputLabel>
          <OutlinedInput
          required
            id="outlined-adornment-required"
            type='text' 
            value={values.password}
            onChange={handleChange('password')}
            sx={{mr:0.5}}
            endAdornment={
              <InputAdornment position="end">               
                  <FmdGoodSharpIcon/>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    required
                    id="outlined-required"
                    label="Pincode"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Fr/>
              {/* <Button
  variant="contained"
  component="label"
>
  Upload File
  <input 
    type="file"
    hidden
  />
</Button> */}
              <Button sx={{ my: 2, float: "right" }} variant="contained">
                Next
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
