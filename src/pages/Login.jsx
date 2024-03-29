import React, { useState } from "react";
import LoginLayout from "../layout/LoginLayout";
import {
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice";
import axios from "axios";
//import Link from '@mui/material/Link';

const Login = () => {
  const dispatch = useDispatch();

  // const auth = false;
  const {auth,role} = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (email.length < 8 || password.length < 8) {
      setError("Invalid details provided"); 
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/search`, {
          email: email,
          password: password,
          generate:true
        })
        .then((res) => {
          if (res.data.length > 0) {
            dispatch(login({ id: res.data[0]._id, role: res.data[0].role,name:res.data[0].name,token:res.data[1],wallet:res.data[0].wallet }));
          } else {
            setError("Invalid Credentials");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div>
      {auth && role !== "agent" ? <Navigate to="/admin" replace /> : auth && role ==="agent" ? <Navigate to="/agent" replace /> :"" }
      <LoginLayout>
      
{error ? (<>
        <Alert
          action={
             <Button color="inherit" size="small" onClick={()=>setError()}>
              &times;
            </Button>
          }
          severity="error"
        >
          {error}
        </Alert>
        </>): (<></>)}
        <h3>User Login</h3>
        <Typography variant="caption" display="block" gutterBottom>
          It is a long established fact that a reader will be distracted by the
          readable.
        </Typography>
        <TextField
          id="outlined-helperText"
          label="Email address"
          sx={{ mt: 1 }}
          size="small"
          fullWidth
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <TextField
          id="outlined-helperText"
          label="Password"
          type="password"
          size="small"
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          sx={{ mt: 1 }}
        />
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ px: 1 }}
        >
          <Grid item lg={6}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
          </Grid>
          {/* <Grid item lg={6}>
            <Link
              to="/forgot"
              style={{ color: "var(--main-color)", textDecoration: "none" }}
            >
              <p>Forgot Password?</p>
            </Link>
          </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{
              width: "50%",
              backgroundColor: "var(--main-color)",
              color: "white",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </Button>
        </Grid>

        <br />
        <Link
          to="/register"
          style={{ color: "var(--main-color)", textDecoration: "none" }}
        >
          Create Account
        </Link>
        <br />

        {/* <Link to="/admin" style={{color:"var(--main-color)",textDecoration:"none"}} >
            Check Admin dashboard
        </Link> */}
        {/* <Link to="/user" style={{color:"var(--main-color)",textDecoration:"none"}} >
            Check User dashboard
        </Link> */}
      </LoginLayout>
    </div>
  );
};



export default Login;
