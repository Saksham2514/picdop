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


const Form = ({ disabled }) => {
  const [activeClass, setActive] = React.useState("");
  // const [values, setValues] = React.useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });

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
              <Typography>Bank Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item md={6} sx={{pr:1}}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Card Number  "
                    defaultValue=""
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Card Holder Name "
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={6} sx={{pr:1}}>
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Expiry Date"
                    defaultValue=""
                  />
                </Grid>
                <Grid item md={6}>  
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="CVV"
                    type="password"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
        
              <Button sx={{my:2,float:"right"}}  variant="contained">Register</Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
