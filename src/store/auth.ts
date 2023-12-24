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
  
  export const authActions = authSlice.actions;
  export default authSlice.reducer;