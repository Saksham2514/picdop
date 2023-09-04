import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../redux/slice';
import { useState } from 'react';

const BankDetailModal = ({openModal,setOpenModal,data,setAmount, closeRedeem}) => {
    const dispatch =  useDispatch();

    const [accountDetail,setAccountDetails]=useState({
        holderName:"",
        accountNumber:"",
        bankName:"",
        ifscCode:""
    });
    const [upiDetail,setUPIDetail] = useState({
        upiID:"",
        upiHolder:""
    })

    const handleClickClose = () => {
        setOpenModal(false);
    };

    
  return (
    <Dialog open={openModal} onClose={handleClickClose}>
        <DialogTitle>Update Bank Details</DialogTitle>
        <DialogContent >
            <Grid container fullWidth spacing={3}>

                <Grid item xs={12}>
                    <Typography
                        style={{ fontWeight: "bold" }}
                        variant="h5"
                    >
                        Account Details
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Account Holder Name"
                        name='holderName'
                        value={accountDetail.holderName}
                        variant="outlined"
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        id="outlined-start-adornment"
                        // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Account Number"
                        name='accountNumber'
                        value={accountDetail.accountNumber}
                        variant="outlined"
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        // onChange={(e) => this.setState({ shopName: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="IFSC Code"
                        name='ifscCode'
                        value={accountDetail.ifscCode}
                        variant="outlined"
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        // onChange={(e) => this.setState({ shopNumber: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Bank Name"
                        name='bankName'
                        value={accountDetail.bankName}
                        variant="outlined"
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        // onChange={(e) => this.setState({ contact: e.target.value })}
                        style={{ marginBottom: "1.5rem" }}
                        id="outlined-start-adornment"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        style={{ fontWeight: "bold" }}
                        variant="h5"
                    >
                        UPI Details
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        size="small"
                        fullWidth
                        label="UPI Holder Name"
                        name='upiHolder'
                        value={upiDetail.upiHolder}
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        // onChange={(e) => this.setState({ line1: e.target.value })}
                        variant="outlined"
                        id="outlined-start-adornment"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        size="small"
                        fullWidth
                        label="UPI ID"
                        name='upiID'
                        value={upiDetail.upiID}
                        // InputProps={{
                        // readOnly: this.state.edit,
                        // }}
                        // onChange={(e) => this.setState({ line1: e.target.value })}
                        variant="outlined"
                        id="outlined-start-adornment"
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={()=>{}}>Continue</Button>
        </DialogActions>
      </Dialog>
  )
}

export default BankDetailModal