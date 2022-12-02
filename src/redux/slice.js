import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:false,
  id:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   login : (state,action)=>{
     state.auth = true 
     state.id = action.payload 
   } ,
   logout : (state)=>{
     state.auth = false
     state.id = ""
   } ,
  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = userSlice.actions

export default userSlice.reducer