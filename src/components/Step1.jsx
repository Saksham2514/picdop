import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,

  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Form = ({setStep1}) => {
    const [category, setCategory] = React.useState(10);
    const [subcategory, setSubCategory] = React.useState(10);
    const [activeClass, setActive] = React.useState('');

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

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
        <Grid item md={12}>
          <Accordion onChange = {(e,expanded) => {
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
              <Typography>User Type</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Grid container>
                <Grid item md={6}>
                <FormControl  sx={{ minWidth:200 , my:{ xs: 2, md: 0} }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Category"
          onChange={handleCategory}
        >
          <MenuItem value={10}>
          </MenuItem>
          <MenuItem value={10}>Medical</MenuItem>
          <MenuItem value={20}>Non Medical</MenuItem>
          <MenuItem value={30}>Technical</MenuItem>
        </Select>
      </FormControl>
                </Grid>
                <Grid item md={6}>
                <FormControl fullWidth  sx={{ minWidth:200  }}>
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
          <MenuItem value={10}>Retailer</MenuItem>
          <MenuItem value={20}>Whole Seller</MenuItem>
          <MenuItem value={30}>Customer</MenuItem>
        </Select>
      </FormControl>
                </Grid>
              </Grid>
              <Button onClick={
                ()=>{setStep1(true)}
              } sx={{my:2,float:"right"}}  variant="contained">Next</Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Form;
