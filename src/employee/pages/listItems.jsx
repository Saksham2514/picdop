import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../App.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { makeStyles } from "@material-ui/core/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { List } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  listitemRoot: {
    color: "white",
    backgroundColor: "#4775FE",
    "&:hover": {
      backgroundColor: "white",
      color: "#4775FE",
      "& $iconRoot": {
        color: "#4775FE",
      },
    },
    "& $iconRoot": {
      color: "#white",
    },
  },
  iconRoot: {
    color: "white",
  },
});

export const MainListItems = () => {
  const classes = useStyles();
  return (
    <List>
      <Link to="/delivery" style={{ textDecoration: "none" }}>
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Book a Delivery" />
        </ListItem>
      </Link>
      <Link to="/collection" style={{ textDecoration: "none" }}>
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText primary="Collection" />
        </ListItem>
      </Link>
      <Link to="/earnings" style={{ textDecoration: "none" }}>
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Daily Earnings" />
        </ListItem>
      </Link>
      <Link to="/prices" style={{ textDecoration: "none" }}>
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Set Prices" />
        </ListItem>
      </Link>

      <Link to="/" style={{ textDecoration: "none" }}>
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </List>
  );
};
