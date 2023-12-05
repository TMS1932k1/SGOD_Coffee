import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order} from '../../types/order';

interface cartState {
  cart: Order[];
  selects: Order[];
  isLoading: boolean;
}

const initialState: cartState = {
  cart: [],
  selects: [],
  isLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.cart = [action.payload, ...state.cart];
    },
    removeOrder: (state, action: PayloadAction<Order[]>) => {
      state.cart = [
        ...state.cart.filter(item => {
          return action.payload.findIndex(order => order.id === item.id) === -1;
        }),
      ];
    },
    setAllSelects: state => {
      state.selects = state.cart;
    },
    cancleSelect: state => {
      state.selects = [];
    },
    updateSelects: (state, action: PayloadAction<Order>) => {
      const isHave =
        state.selects.filter(item => item.id === action.payload.id).length > 0;

      if (isHave) {
        state.selects = state.selects.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.selects = [...state.selects, action.payload];
      }
    },
  },
});

export const {
  addOrder,
  setAllSelects,
  cancleSelect,
  updateSelects,
  removeOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
