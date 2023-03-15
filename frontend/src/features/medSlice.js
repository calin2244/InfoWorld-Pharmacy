import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
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
    reducers: {},
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

export default medsSlice.reducer;