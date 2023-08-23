import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import * as React from "react";
import {
  Collapse,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { IconButton } from "@mui/material";

const Card = (props) => {
  console.log(props.data?._id?.user?.name);
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper elevation={3}>
      <Grid
        container
        paddingBottom={1}
        pr={1}
        style={{ padding: "1rem 1.5rem" }}
      >
        <Grid item xs={9}>
          <Typography
            variant="h5"
            textAlign={"center"}
            marginTop={1}
            textTransform={"capitalize"}
          >
            {props.data?._id?.user?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign={"end"}>
          {props.data.totalNotes} Notes
          <IconButton
            aria-label="view"
            onClick={() => setExpanded(!expanded)}
            size="small"
          >
            {!expanded ? (
              <ArrowDropDownOutlinedIcon />
            ) : (
              <ArrowDropUpOutlinedIcon />
            )}
          </IconButton>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {props.data?.productName.length ? (
              <table style={{ width: "100%" }}>
                <thead style={{ fontWeight: "bold" }}>
                  <tr>
                    <td>Product Name</td>
                    <td>Quantity</td>
                    <td>Created At</td>
                  </tr>
                </thead>
                {props.data.productName.map((c, ind) => {
                  return (
                    <tr component="div">
                      <td>{props.data.productName[ind]}</td>
                      <td>{props.data.quantity[ind]}</td>
                      <td>
                        {new Date(props.data.createdAt[ind]).toDateString()}
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <>No Notes added</>
            )}
          </Collapse>
        </Grid>
        {/* <Grid item xs={12} px={1} mt={2} textAlign={"center"}>
            <Button size="small" variant="outlined">
              Manage subcategories
            </Button>
          </Grid> */}
                
      </Grid>
    </Paper>
  );
};

export default Card;
