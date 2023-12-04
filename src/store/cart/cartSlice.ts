import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order} from '../../types/order';

interface cartState {
  cart: Order[];
  isLoading: boolean;
}

const initialState: cartState = {
  cart: [],
  isLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.cart = [action.payload, ...state.cart];
    },
  },
});

export const {addOrder} = cartSlice.actions;
export default cartSlice.reducer;
