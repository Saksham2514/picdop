import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../assets/css/App.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { makeStyles } from "@material-ui/core/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { List } from "@mui/material";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
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
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state);
  const classes = useStyles();
  return (
    <List>
      {/* <a href={role !== "agent" ?  "/admin" : "/agent"}> */}
      <a
        href={role !== "agent" ? "/delivery" : "/agent"}
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
      </a>
      <a
        href={role !== "agent" ? "/collection" : "/orders"}
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
      </a>
      
      <a
        href={role !== "agent" ? "/admin" : "/agent/complete"}
        style={{ textDecoration: "none" }}
      >
                    <ListItem button className={classes.listitemRoot}>
              <ListItemIcon className={classes.iconRoot}>
                <MonetizationOnIcon />
              </ListItemIcon>
          <ListItemText
            primary={role !== "agent" ? "Daily Earnings" : "Completed Orders"}
          />
        </ListItem>
      </a>
      {role === "admin" ? (
      <a
        href={"/commission-request"}
        style={{ textDecoration: "none" }}
      >
                    <ListItem button className={classes.listitemRoot}>
              <ListItemIcon className={classes.iconRoot}>
                <RequestPageOutlinedIcon />
              </ListItemIcon>
          <ListItemText
            primary={role !== "agent" ? "Daily Earnings" : "Completed Orders"}
          />
        </ListItem>
      </a>):<></>}
   
      {role!="agent"?<a
        href={role !== "admin" ? "/notes" : "/notesAdmin"}
        style={{ textDecoration: "none" }}
      >
                    <ListItem button className={classes.listitemRoot}>
              <ListItemIcon className={classes.iconRoot}>
                <ListAltIcon />
              </ListItemIcon>
          <ListItemText
          // primary={role !== "agent" ? "Notes" : "Completed Orders"}
          primary={"Notes"}
          />
        </ListItem>
      </a>:""}
     
          {role === "admin" ? (
            <>
              <a href="/prices" style={{ textDecoration: "none" }}>
                <ListItem button className={classes.listitemRoot}>
                  <ListItemIcon className={classes.iconRoot}>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Set Prices" />
                </ListItem>
              </a>
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
