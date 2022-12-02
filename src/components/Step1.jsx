import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Form = ({ disabled, setStep1, details, setDetails }) => {
  const [activeClass, setActive] = React.useState("");

  const handleSubmit = () => {
    if (details.category && details.subCategory) {
      setStep1(true);
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
              <Typography>User Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item sx={{ mt: 1, pr: 1 }} md={6}>
                  <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="category"
                      label="Category"
                      onChange={(e) => {
                        setDetails({ ...details, category: e.target.value });
                      }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sx={{ mt: 1 }} md={6}>
                  <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      Sub Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="subCategory"
                      label="SubCategory"
                      onChange={(e) => {
                        setDetails({ ...details, subCategory: e.target.value });
                      }}
                    >
                      <MenuItem value={40}>Ten</MenuItem>
                      <MenuItem value={50}>Twenty</MenuItem>
                      <MenuItem value={60}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  {/* SELECT 2 */}
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
