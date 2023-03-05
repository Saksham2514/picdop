import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../assets/css/App.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { makeStyles } from "@material-ui/core/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";

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
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state);
  const classes = useStyles();
  return (
    <List>
      {/* <Link to={role !== "agent" ?  "/admin" : "/agent"}> */}
      <Link
        to={role !== "agent" ? "/delivery" : "/agent"}
        style={{ textDecoration: "none" }}
      >
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText
            primary={role !== "agent" ? "Book a Delivery" : "Available Orders"}
          />
        </ListItem>
      </Link>
      <Link
        to={role !== "agent" ? "/collection" : "/orders"}
        style={{ textDecoration: "none" }}
      >
        <ListItem button className={classes.listitemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText
            primary={role !== "agent" ? "Collection" : "Accepted Orders"}
          />
        </ListItem>
      </Link>
      {role !== "agent" ? (
        <>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.listitemRoot}>
              <ListItemIcon className={classes.iconRoot}>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Daily Earnings" />
            </ListItem>
          </Link>
          {role === "admin" ? (
            <>
              <Link to="/prices" style={{ textDecoration: "none" }}>
                <ListItem button className={classes.listitemRoot}>
                  <ListItemIcon className={classes.iconRoot}>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Set Prices" />
                </ListItem>
              </Link>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <ListItem
        button
        className={classes.listitemRoot}
        onClick={() => {
          dispatch(logout());
        }}
      >
        <ListItemIcon className={classes.iconRoot}>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};
