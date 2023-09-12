import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,  TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import ReactDOM  from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateWallet } from '../../redux/slice';
import { useEffect } from 'react';

const Modal = ({openModal,setOpenModal}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(100);
  const handleClickClose = () => {
      setOpenModal(false);
  };
  const [data,setData]=useState({
      holderName:"",
      accountNumber:"",
      bankName:"",
      ifscCode:"",
      upiID:"",
      amount:""
  });
  const {token,role,wallet} = useSelector((state)=>state);
  
  const min = 100;
  const max = 10000;
  

  const addMoney = ()=>{
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}addToWallet`, {
          amount:amount,
      },{
        headers:{
            "Authorization":token
        }
      })
      .then((res) => {
          setAmount(100)
          dispatch(updateWallet({ wallet:res.data.wallet }));
        })
      .catch((err) => console.log(err));
  }
      
  const changeData = (e)=>{
    setData((curr)=>{
      return {...curr,[e.target.name]:e.target.value};
    })
  }
  const redeemMoney = ()=>{
    if(!(data.accountNumber && data.bankName && data.holderName && data.ifscCode ) && !data.upiID){
      return alert("Please Enter Account Details or UPI Details");
    }else if(!data.amount){
      return alert("Please Enter Redeem Amount");
    }
    
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}createredeemreq`,data,{
      headers:{
          "Authorization":token
      }
    })
    .then((res) => {
        setAmount(100)
        if(res.data?.wallet)dispatch(updateWallet({ wallet:res.data.wallet }));
    })
    .catch((err) => console.log(err));
  }

  const getBankDetails = ()=>{
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}getBankDetails`, {},{
      headers:{
          "Authorization":token
      }
    })
    .then((res) => {
      setData({
        holderName:res.data?.holderName,
        accountNumber:res.data?.accountNumber,
        bankName:res.data?.bankName,
        ifscCode:res.data?.ifscCode,
        upiID:res.data?.upiID,
        
      })
    })
    .catch((err) => console.log(err));
  }

  useEffect(()=>{
    getBankDetails();
  },[])

  return ReactDOM.createPortal(
    role == "user"?
    <Dialog open={openModal} onClose={handleClickClose}>
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Amount"
            type="number"
            fullWidth
            value={amount}
            inputProps={{ min, max }}
            onChange={(e)=>{
                var value = parseInt(e.target.value, 10);
                if (value > max) value = max;
                if (value < min) value = min;
                setAmount(e.target.value)
            }}
            variant="standard"
            style={{minWidth:"200px"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={()=>{
            addMoney(amount)
            
            handleClickClose()
            }}>Add</Button>
        </DialogActions>
      </Dialog>:
      
        <Dialog open={openModal} onClose={handleClickClose}>
          <DialogTitle>
              Redeem Money
          </DialogTitle>
          <DialogContent>
            <Grid container fullWidth spacing={3}>

              <Grid item xs={12}>
                  <Typography
                      // style={{ fontWeight: "bold" }}
                      variant="h5"
                  >
                      Account Details
                  </Typography>
              </Grid>
              
              
              <Grid item xs={12} md={6}>
                  <TextField
                      size="small"
                      label="Account Holder Name"
                      name='holderName'
                      value={data.holderName}
                      variant="standard"
                      style={{minWidth:"200px"}}
                      id="outlined-start-adornment"
                      onChange={changeData}
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                  <TextField
                      fullWidth
                      size="small"
                      label="Account Number"
                      name='accountNumber'
                      value={data.accountNumber}
                      variant="standard"
                      style={{minWidth:"200px"}}
                      onChange={changeData}
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                  <TextField
                      fullWidth
                      size="small"
                      label="IFSC Code"
                      name='ifscCode'
                      value={data.ifscCode}
                      variant="standard"
                      style={{minWidth:"200px"}}
                      onChange={changeData}
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                  <TextField
                      size="small"
                      fullWidth
                      label="Bank Name"
                      name='bankName'
                      value={data.bankName}
                      variant="standard"
                      style={{minWidth:"200px"}}
                      onChange={changeData}
                  />
              </Grid>

              <Grid item xs={12}>
                  <Typography
                      variant="h5"
                  >
                      UPI Details
                  </Typography>
              </Grid>

              
              <Grid item xs={12}>
                  <TextField
                      size="small"
                      fullWidth
                      label="UPI ID"
                      name='upiID'
                      value={data.upiID}
                      onChange={changeData}
                      variant="standard"
                      style={{minWidth:"200px"}}
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  label="Redeem Amount"
                  type="number"
                  name="amount"
                  fullWidth
                  value={data.amount}
                  onChange={changeData}      
                  inputProps={{ min, max }}
                  variant="standard"
                  style={{minWidth:"200px"}}
                />
              </Grid>
            </Grid>
            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={()=>{
              if(parseInt(wallet) >= amount){
                redeemMoney();
                handleClickClose();
              }else{
                alert("Insufficient amount");
              }
            }}>Redeem</Button>
          </DialogActions>
        </Dialog>,
  document.querySelector(".modal"))
}

export default Modal