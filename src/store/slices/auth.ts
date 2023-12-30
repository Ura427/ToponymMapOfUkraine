import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "authentification",
    initialState: {
      value: false,
    },
    reducers: {
      login: (state) => {
        state.value = true;
      },
      logout: (state) => {
        state.value = false;
      },
    },
  });
  
  export const {login, logout} = authSlice.actions;
  export const authReducer = authSlice.reducer;