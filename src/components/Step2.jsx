import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Form = ({disabled}) => {
    // const [category, setCategory] = React.useState('');
    const [subcategory, setSubCategory] = React.useState('');
    const [activeClass, setActive] = React.useState('');

  // const handleCategory = (event) => {
  //   setCategory(event.target.value);
  // };
  const handleSubCategory = (event) => {
    setSubCategory(event.target.value);
  };
  
  return (
    <div>
      <Grid
        sx={{ p: 1}}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* Row 1  */}

       
        {/* Row 2  */}
        <Grid item xs={12}>
          <Accordion disabled={disabled}
          onChange = {(e,expanded) => {
        if(expanded){
          setActive("active");
        }
        else{
          setActive("");
        }
      }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
                <div className={`counter ${activeClass}`}></div>
              <Typography>Shop Details</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Grid container>
                <Grid item xs={6}>
                <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Sub Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={subcategory}
          label="Sub Category"
          onChange={handleSubCategory}
        >
          <MenuItem value={10}>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
                </Grid>
              </Grid>
              <Button sx={{my:2,float:"right"}}  variant="contained">Next</Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Form;
