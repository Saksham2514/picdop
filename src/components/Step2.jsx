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

import Fr from "./Fr";

const Form = ({ disabled, setStep2, details, setDetails }) => {
  const [activeClass, setActive] = React.useState("");

  const handleSubmit = () => {
    if (details.shopName && details.shopNumber) {
      setStep2(true);
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
                <Grid item md={6} sx={{ mt: { xs: 1, md: 0 }, pr: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Shop Name"
                    defaultValue=""
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, shopName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={6} sx={{ mt: { xs: 1, md: 0 } }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Shop Number"
                    defaultValue=""
                    fullWidth
                    onChange={(e) => {
                      setDetails({ ...details, shopNumber: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Fr label="Shop Images" />
              <Button
                onClick={handleSubmit}
                sx={{ my: 2, float: "right" }}
                variant="contained"
              >
                {" "}
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
