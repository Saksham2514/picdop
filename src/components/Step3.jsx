import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Form = ({ disabled,setStep3 }) => {
  const [activeClass, setActive] = React.useState("");
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

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
              <Typography>Owner Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item sx={{mt:1,pr:1}} md={6}>
                  <TextField
                  fullWidth
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                  />
                </Grid>
                <Grid item sx={{mt:1}} md={6}>
                  <TextField
                  fullWidth
                    required
                    id="outlined-required"
                    label="Last Number"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container >
                <Grid item sx={{mt:1,pr:1}} md={6}>
                  <TextField
                  fullWidth
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    defaultValue=""
                  />
                  
                </Grid>
                <Grid item sx={{mt:1}} md={6}>
                  <TextField
                  fullWidth
                    required
                    id="outlined-required"
                    label="Mail ID"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
          
              <Button onClick={
                ()=>{setStep3(true)}
              } sx={{my:2,float:"right"}}  variant="contained">Next</Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
