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

const Form = ({ disabled, setStep4, details, setDetails }) => {
  const [activeClass, setActive] = React.useState("");

  const handleSubmit = () => {
    if (
      details.line1 &&
      details.line2 &&
      details.city &&
      details.state &&
      details.pin
    ) {
      setStep4(true);
      // console.log(details);
    } else alert("Fill all Fields ");
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
              <Typography>Location and Route</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item md={6} sx={{ mt: 1, pr: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, line1: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Address Line 1 "
                    defaultValue=""
                  />
                </Grid>
                <Grid item md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, line2: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Address Line 2 "
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={6} sx={{ mt: 1, pr: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, city: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="City"
                    defaultValue=""
                  />
                </Grid>
                <Grid item md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, state: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="State"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={6} sx={{ mt: 1, pr: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, pin: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Pincode"
                    defaultValue=""
                  />
                </Grid>
                <Grid item md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, mapsLink: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Google Maps Link"
                    defaultValue=""
                  />
                </Grid>
              </Grid>

              <Button
                onClick={handleSubmit}
                sx={{ my: 2, float: "right" }}
                variant="contained"
              >
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
