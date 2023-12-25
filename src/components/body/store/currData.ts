import { createSlice, configureStore } from "@reduxjs/toolkit";



const currRegion = createSlice({
    name: "currentRegion",
    initialState: null,
    reducers: {
        setCurrRegion: (state, action) => {
            state = action.payload;
        }
    }
})

const currToponym = createSlice({
    name: "currentToponym",
    initialState: null,
    reducers: {
        setCurrToponym: (state, action) => {
            state = action.payload;
        }
    }
})


export const currRegionActions = currRegion.actions;
export const currToponymActions = currToponym.actions;

export const currDataStore = configureStore({
    reducer: {currRegion: currRegion.reducer, currToponym: currToponym.reducer }
})