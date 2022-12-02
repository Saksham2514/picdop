import React from "react";
import axios from "axios"
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
import { useDispatch } from "react-redux";
import { login } from "../redux/slice";


const Form = ({ disabled,details,setDetails }) => {
  const [activeClass, setActive] = React.useState("");
  const [resp, setResp] = React.useState([]);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (
      details.cardCVV &&
      details.cardHolder &&
      details.cardNumber &&
      details.cardExpiry
    ) {
      if(details.cardCVV.length > 3 ){
        alert("Enter correct card details")
      }
      else {
        console.log(process.env.REACT_APP_BACKEND_URL);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}users`,details).then(res=>{setResp(res.data);}).catch(err=>console.log(err))
        if(resp.matchedCount === 0 ){ 
          dispatch(login(resp.upsertedId))
          // console.log("New ");
          // console.log(resp.upsertedId);
        }else{
          // console.log(resp);
          // console.log("matched ");
          alert("User Already exists")
        }

      }
      
    } else 
    {alert("Fill all Fields ");
    console.log(details);}
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
              <Typography>Bank Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item md={6} sx={{pr:1}}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Card Number  "
                    defaultValue=""
                    fullWidth
                        onChange={(e) => {
                      setDetails({ ...details, cardNumber: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Card Holder Name "
                    defaultValue=""
                    fullWidth
                        onChange={(e) => {
                      setDetails({ ...details, cardHolder: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={6} sx={{pr:1}}>
                <TextField
                    required
                    id="outlined-required"
                    label="Expiry Date"
                    defaultValue=""
                    fullWidth
                        onChange={(e) => {
                      setDetails({ ...details, cardExpiry: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={6}>  
                <TextField
                    required
                    id="outlined-required"
                    label="CVV"
                    type="password"
                    fullWidth
                        onChange={(e) => {
                      setDetails({ ...details, cardCVV: e.target.value });
                    }}
                    defaultValue=""
                  />
                </Grid>
              </Grid>
        
              <Button onClick={handleSubmit} sx={{my:2,float:"right"}}  variant="contained">Register</Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
