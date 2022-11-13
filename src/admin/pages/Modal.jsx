import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, Button } from "@mui/material/";
import { Divider } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props, { children }) {
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
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">
            Delete {props.label}
            <span style={{ float: "right" }}>
              <Button onClick={handleClose}>X</Button>
            </span>
          </h2>
          <Divider />
          
          <h3 style={{ textAlign: "center" }} id="parent-modal-description">
              Are Your Sure?
            </h3>
            <h3 style={{ textAlign: "center" }} id="parent-modal-description">
              This {props.label} will be deleted
            </h3>
          <Divider />
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
            {props.label}
          </Button>
        </Box>
      </Modal>
      <Button
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
        Delete Order
      </Button>
    </div>
  );
}
