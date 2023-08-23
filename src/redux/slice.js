import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  id: "",
  name: "",
  role: "",
  token: "",
  wallet: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.wallet = action.payload.wallet;
    },
    logout: (state) => {
      state.auth = false;
      state.id = "";
      state.name = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
