import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, Button } from "@mui/material/";
import { Divider, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

const style = {
  position: "fixed",
  inset: 0,
  margin: "auto",
  width: "90%",

  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props, children) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">
            Delete Order 
            <span style={{ float: "right" }}>
              <Button onClick={handleClose}>X</Button>
            </span>
          </h2>
          <iframe
            src={`https://www.google.com/`}
            style={{ border: 0 }}
            title="location"
            allowFullScreen
            height="75%"
            width="100%"
          />
          <Button
            variant="contained"
            size="small"
            style={{
              color: "white",
              backgroundColor: "var(--error-color)",
              borderRadius: "0.25rem",
              marginTop: "1rem ",
              marginBottom: 0,
              float: "right",
              paddingX: "1rem",
              textTransform: "capitalize",
            }}
          >
            Copy Link
          </Button>
        </Box>
      </Modal>
      {/* <Button
            variant="contained"
            size="small"
            style={{
              color: "white",
              backgroundColor: "var(--error-color)",
              borderRadius: "0.25rem",
              margin: "1rem 0",
              float: "right",
              paddingX: "1rem",
              textTransform: "capitalize",
            }}
        onClick={handleOpen}
          
          >
            Get Link  
          </Button>
           */}
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="Get Location Link"
        InputProps={{
          readOnly: !props.edit,
        }}
        onClick={handleOpen}
      />
    </div>
  );
}
