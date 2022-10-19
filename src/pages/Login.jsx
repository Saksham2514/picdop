import React, { useState } from 'react'
import LoginLayout from '../layout/LoginLayout'
import { TextField,Typography,Grid,FormControlLabel,Checkbox,Button } from '@mui/material'
import { Link } from "react-router-dom";

//import Link from '@mui/material/Link';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  function handleSubmit() {
  
        if (password.length < 8){
         
        alert("Password must have atleast 8 characters ");
        }else{
         
          alert("Success");
        }
    
  }
  return (
    <div>
      <LoginLayout>
        
        <h3>User Login</h3>
        <Typography variant="caption" display="block" gutterBottom>
        It is a long established fact that a
reader will be distracted by the readable.
      </Typography>
        <TextField
          id="outlined-helperText"
          label="Email address"
          sx={{mt:1}}
          size="small"
          fullWidth
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
        />
        <TextField
          id="outlined-helperText"
          label="Password"
          type="password"
          size="small"
          fullWidth
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
          sx={{mt:1}} 
        />
        <Grid container      
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{px:1}}
        >
        <Grid item lg={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
        </Grid>
        <Grid item lg={6} >
        <Link to="/forgot" style={{color:"var(--main-color)",textDecoration:"none"}}>
        <p>
            Forgot Password?
            </p>
        </Link>

      
        </Grid>
        </Grid>
        <Grid item xs={12} >
            
            <Button variant="contained" style={{width:"50%",backgroundColor:"var(--main-color)"}} onClick={()=>{handleSubmit()} }>Login</Button>
        </Grid>
        
            
        <br/>
        <Link to="/register" style={{color:"var(--main-color)",textDecoration:"none"}} >
            Create Account
        </Link>

      </LoginLayout>
    </div>
  )
}

export default Login
