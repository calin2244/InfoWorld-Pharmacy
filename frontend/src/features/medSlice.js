import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: localStorage.getItem("meds")
    ? JSON.parse(localStorage.getItem("meds"))
    : [],
    status: null,
    error: null
};

export const medsFetch = createAsyncThunk(
    "meds/medsFetch", //name of the slice + name of the const
    async (id = null, { rejectWithValue }) => {
        try{
            const response = await axios.get("http://localhost:10000/meds")
            return response?.data;    
        }catch(err){
            return rejectWithValue("Couldn't fetch meds.");
        }
    }
);

const medsSlice = createSlice({
    name: "meds",
    initialState,
    reducers: {
        // decreaseStock: (state, action) =>{
        //     const { id, quantity } = action.payload;
        //     const itemIndex = state.items.findIndex(item => item.id === id);
        //     state.items[itemIndex].stock -= 1;
        // }
        decreaseStock: (state, action) =>{
            const { id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            const updatedItem = { ...state.items[itemIndex], stock: state.items[itemIndex].stock - 1 };
            const updatedItems = [ ...state.items.slice(0, itemIndex), updatedItem, ...state.items.slice(itemIndex + 1) ];
            state.items = updatedItems;

            console.log(updatedItems);

            localStorage.setItem('meds', JSON.stringify(updatedItems));
        }
    },
    extraReducers: {
        [medsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [medsFetch.fulfilled]: (state, action) => {
            state.status = "success";
            state.items = action.payload;
        },
        [medsFetch.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const { decreaseStock } = medsSlice.actions;
export default medsSlice.reducer;