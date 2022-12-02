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

const Form = ({ disabled, setStep3, details, setDetails }) => {
  const [activeClass, setActive] = React.useState("");
  const [firstName, setFname] = React.useState("");
  const [lastName, setLname] = React.useState("");

  const handleSubmit = () => {
    if (
      firstName &&
      lastName &&
      details.contact &&
      details.email &&
      details.password
    ) {
      setStep3(true);
      setDetails({ ...details, name: firstName + " " + lastName });
    } else {
      alert("Fill all Fields ");
    }
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
              <Typography>Owner Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item sx={{ mt: 1, pr: 1 }} md={6}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                  />
                </Grid>
                <Grid item sx={{ mt: 1 }} md={6}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{ mt: 1, pr: 1 }} md={6}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, contact: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    defaultValue=""
                  />
                </Grid>
                <Grid item sx={{ mt: 1 }} md={6}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, email: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Mail ID"
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{ mt: 1, pr: 1 }} md={6}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, password: e.target.value });
                    }}
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    type="password"
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
