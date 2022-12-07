import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:false,
  id:"",
  role:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   login : (state,action)=>{
     state.auth = true 
     state.id = action.payload.id 
     state.role = action.payload.role 
     console.log(state.id)
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