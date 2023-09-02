import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import ReactDOM  from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateWallet } from '../../redux/slice';

const Modal = ({openModal,setOpenModal}) => {
    const dispatch = useDispatch();
    const id =  useSelector(state=>state.id)
    const role =  useSelector(state=>state.role)
    const wallet =  useSelector(state=>state.wallet)
    const [amount, setAmount] = useState(100);
    const handleClickClose = () => {
        setOpenModal(false);
    };

    const min = 100;
    const max = 10000;

    const addMoney = ()=>{
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}addToWallet`, {
              userID:id,
              amount:amount,
          })
          .then((res) => {
              setAmount(100)
              dispatch(updateWallet({ wallet:res.data.wallet }));
            })
            .catch((err) => console.log(err));
        }
        
        const deductMoney = ()=>{
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}deductWallet`, {
                userID:id,
                amount:amount,
            })
            .then((res) => {
                setAmount(100)
                dispatch(updateWallet({ wallet:res.data.wallet }));
            })
          .catch((err) => console.log(err));
      }

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
      </Dialog>:<Dialog open={openModal} onClose={handleClickClose}>
        <DialogTitle>Redeem Money</DialogTitle>
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
            if(parseInt(wallet) >= amount){
              deductMoney(amount)
              handleClickClose()
            }else{
              alert("Insufficient amount");
            }
          }}>Redeem</Button>
        </DialogActions>
      </Dialog>,
  document.querySelector(".modal"))
}

export default Modal