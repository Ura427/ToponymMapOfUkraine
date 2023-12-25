import { configureStore, createSlice } from "@reduxjs/toolkit";


const avgRating = createSlice({
    name: "averageToponymRating",
    initialState: 0,
    reducers: {
        setAvgRating: (state, action) => {
            state = action.payload;
        }
    }
})


const currRating = createSlice({
    name: "currentToponymRating",
    initialState: 0,
    reducers: {
        setCurrRating: (state, action) => {
            state = action.payload
        }
    }
})

export const avgRatingActions = avgRating.actions;
export const currRatingActions = currRating.actions;


export const avgRatingReducer = avgRating.reducer;
export const currRatingReducer = currRating.reducer;

export const ratingStore = configureStore({
    reducer: { avgRating: avgRating.reducer, currRating: currRating.reducer}
})