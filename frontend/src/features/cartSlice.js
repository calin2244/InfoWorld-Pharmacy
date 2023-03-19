import { compose, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, stock, ...rest } = action.payload;
      const medIndex = state.cartItems.findIndex((item) => item.id === id);

      if (medIndex >= 0) {
        if (stock > 0) {
          const updatedItem = {
            ...state.cartItems[medIndex],
            quantity: state.cartItems[medIndex].quantity + 1,
            stock: stock - 1,
          };
          console.log(updatedItem);
          state.cartItems[medIndex] = updatedItem;
          toast(`Added ${name} to cart 💊`, {
            position: "bottom-left",
          });
        } else {
          toast(`Sorry, ${name} is out of stock.`, {
            position: "bottom-left",
          });
        }

      } else {
        if (stock > 0) {
          const newItem = { id, name, stock: stock - 1, quantity: 1, ...rest };
          state.cartItems.push(newItem);
          toast(`Added ${name} to cart 💊`, {
            position: "bottom-left",
          });
        } else {
          toast(`Sorry, ${name} is out of stock.`, {
            position: "bottom-left",
          });
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action){
        const nextItem = state.cartItems.filter(
            item => item.id !== action.payload.id
        );
        
        console.log(nextItem);

        state.cartItems = nextItem;
        localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity(state, action) {
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity--;
        } else if (state.cartItems[itemIndex].quantity === 1) {
          const nextItems = state.cartItems.filter(item => item.id !== action.payload.id);
      
          state.cartItems = nextItems;
        }
      
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      clearCart(state){
        state.cartItems = [];
        toast.error("Cart cleared!", {
            position: "bottom-left"});
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      getTotals(state) {
        let quantity = state.cartItems.reduce((acc, cur) => {
          const { quantity } = cur;
          acc.quantity += quantity;
      
          return acc;
        },0);
      
        state.totalQuantity = quantity;
      }
  },
 
});

export const { addToCart, removeFromCart, decreaseCartQuantity, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
