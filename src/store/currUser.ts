import { createSlice } from "@reduxjs/toolkit";


type User = {
    id: string | null,
    firstname: string | null,
    lastname: string | null,
    email: string | null,
    password: string | null
  };
  
  
  const initialState: User = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null
  }
  
  
  
  const currUser = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
      setCurrUser: (state, action) => {
        if(action.payload === null){
          state = initialState;
          console.log("payload: " + JSON.stringify(action.payload));
        }
        else{
          const { id, firstname, lastname, email, password } = action.payload;
          state.id = id 
          state.firstname = firstname;
          state.lastname = lastname;
          state.email = email;
          state.password = password;
          console.log("payload: " + JSON.stringify(action.payload));
        }
        
      },
    },
  });
  
  export const currUserActions = currUser.actions;

export default currUser.reducer