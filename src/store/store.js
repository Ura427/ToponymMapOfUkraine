import { configureStore } from "@reduxjs/toolkit";
import { authReducer} from "./slices/auth";
import { currUserReducer } from "./slices/currUser.ts";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        currUser: currUserReducer
    }
})