
import { CartItem, CartState } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  products: []
}

// Create a slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    add_to_cart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.products.find((item: any) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

    },

    remove_from_cart: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },



    increase_quantity: (state, action) => {
     
      const item = state.products.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },



    decrease_quantity: (state, action) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.products = state.products.filter((item) => item.id !== action.payload);
      }
    },




    reset_cart: (state) => {
      state.products = [];
    }




  }
});

// Export actions
export const {
  add_to_cart,
  remove_from_cart,
  increase_quantity, 
  decrease_quantity, 
  reset_cart
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
