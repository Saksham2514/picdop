import React, { useEffect } from "react";
import clsx from "clsx";
import "../../assets/css/App.module.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Appbar from "./Appbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
// import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import { MainListItems } from "./listItems";
import Logo from "../../logo.png"
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../components/Modal";

function Copyright() {
  const id =  useSelector(state=>state.id)
  const role =  useSelector(state=>state.role)
  
  // classes created because it is needed in the footer.
  const classes = useStyles();
  return (
    <Container className={classes.footer}> 
    {id.length > 0 && role.length > 0 ? "" :<Navigate to="/"/>}
      <Typography variant="body2" color="textSecondary" align="center">
        {"Developed and Managed by  "}
        <Link color="inherit" to="https://www.brandon.co.in">
          Brandon
        </Link>
        {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({  
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    
    backgroundColor:"var(--main-color)",
    color:"white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // content which is class of main needs to be flex and column direction
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  // added the footer class
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white",
    alignSelf: "flex-end"
  },
 
}));


export default function Dashboard({children}) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const role =  useSelector(state=>state.role);
  const wallet =  useSelector(state=>state.wallet);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  return (
    <>
    <Modal openModal={openModal} setOpenModal={setOpenModal}/>
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        style={{backgroundColor:"white"}}
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar  className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
          <Link to={role !== "agent" ?  "/admin" : "/agent"}>
            <img src={Logo} style={{height:"4rem"}} alt=""/>
          </Link>  
          </Typography>
          <IconButton
            onClick={handleClickOpen}
            size="small"
            style={{padding:"5px" ,borderRadius:"4px",marginRight:"10px"}}
          >
            <AccountBalanceWalletIcon fontSize="large"/> {wallet}
          </IconButton>
          <Appbar/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{backgroundColor:"var(--main-color)"}}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{color:"white"}} />
          </IconButton>
        </div>
        <Divider />
        <MainListItems/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
     {children}
        <Copyright />
      </main>
    </div>
    </>
  );
}
