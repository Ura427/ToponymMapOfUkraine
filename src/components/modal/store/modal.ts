import { createSlice, configureStore } from "@reduxjs/toolkit"; 

const open = createSlice({
    name: "modalOpen",
    initialState: {
        value: false
    },
    reducers: {
        setActive: (state) => {
            state.value = true;
        },
        setDisabled: (state) => {
            state.value = false;
        }
    }
})

const title = createSlice({
    name:"modalTitle",
    initialState: {
        value: null
    },
    reducers: {
        setTitle: (state, action) => {
            state.value = action.payload
        }
    }
})

const desc = createSlice({
    name: "modalDescription",
    initialState:{
        value: null
    },
    reducers:{
        setDesc: (state, action) => {
            state.value = action.payload
        }
    }
})

export const modalTitleActions = title.actions
export const modalDescActions = desc.actions
export const modalOpenActions = open.actions

export const modalTitleReducer = title.reducer;
export const modalDescReducer = desc.reducer;
export const modalOpenReducer = open.reducer;


export const modalStore =  configureStore({
    reducer: {title: title.reducer, desc: desc.reducer, open: open.reducer}
})