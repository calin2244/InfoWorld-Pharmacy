import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    totalQuantity: 0,
    totalAmount: 0 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const medIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (medIndex >= 0) {
                state.cartItems[medIndex].quantity += 1;
                const { name } = action.payload; 
                toast(`Added ${name} to cart 💊`, {
                    position: "bottom-left"
                },);
            } else {
                const tempMed = { ...action.payload, quantity: 1 };
                state.cartItems.push(tempMed);
                const { name } = action.payload; 
                toast(`Added ${name} to cart 💊`, {
                    position: "bottom-left"
                }); 
            }

            //save to local storage of the browser
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;