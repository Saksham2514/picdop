import React, { useState } from "react";

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

const ImgDisplay = ({ billImage, setLoading }) => (
  <Grid item xs={12} md={6} key={Math.random()} paddingTop={3}>
    <Button
      key={Math.random()}
      variant="contained"
      color="primary"
      onClick={() => {
        setLoading(false);
      }}
    >
      Select different files
    </Button>

    <div
      key={Math.random()}
      style={{
        marginTop: "1rem",
        display: "flex",
        gap: 10,
        overflowX: "auto",
      }}
    >
      {billImage.map((e, i) => (
        <>
          <img src={e} height={150} alt="Images" key={i} />
        </>
      ))}
    </div>
  </Grid>
);

const Form = ({ disabled, setStep2, details, setDetails }) => {
  const [activeClass, setActive] = React.useState("");
  const [loading, setloading] = useState(false);
  const [billImage, setBillImage] = useState([]);

  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener("load", () => {
        res({
          base64: reader.result,
          name: name,
          type,
          size: size,
        });
      });
      reader.readAsDataURL(image);
    });
  };

  const handleBillImage = async (e) => {
    const urls = [];

    for (let i = 0; i < e.target.files.length; i++) {
      await fileToDataUri(e.target.files[i]).then(res=>{
        urls.push(res.base64);
        setBillImage(prevState =>({...prevState,urls}));        
      }).then(setDetails(prevState => ({ ...prevState, shopImages: urls }))).then(setloading(true));
    }
  };

  const handleSubmit = () => {
    if (details.shopName && details.shopNumber) {
      if (billImage.length > 0 && details.billImages) setStep2(true);
      else if (billImage.length > 0 && !details.billImages)
        alert("Fill Fields ");
      else setStep2(true);
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
              {/* <Fr label="Shop Images" name="shopImages"/> */}
              {loading ? (
                <ImgDisplay billImage={details.shopImages} setLoading={setloading} />
              ) : (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Shop Images</Typography>
                  <input
                    type="file"
                    title="This is title"
                    multiple
                    onChange={handleBillImage}
                  />
                </Grid>
              )}
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
