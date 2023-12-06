import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order} from '../../types/order';
import {getData, saveObject} from '../../utils/asyncStorage';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

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

// Load cart data from local
// if not storage return empty array, if have return cart
export const loadStorageCart = createAsyncThunk(
  'storage/cart',
  async (): Promise<Order[]> => {
    let storageOrder = (await getData('@cart')) as Order[] | undefined;
    return storageOrder ?? [];
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.cart = [action.payload, ...state.cart];
      saveObject('@cart', state.cart);
    },
    removeOrder: (state, action: PayloadAction<Order[]>) => {
      state.cart = [
        ...state.cart.filter(item => {
          return action.payload.findIndex(order => order.id === item.id) === -1;
        }),
      ];
      state.selects = [
        ...state.selects.filter(item => {
          return action.payload.findIndex(order => order.id === item.id) === -1;
        }),
      ];
      saveObject('@cart', state.cart);
    },
    removeSelects: state => {
      state.cart = [
        ...state.cart.filter(item => {
          return state.selects.findIndex(order => order.id === item.id) === -1;
        }),
      ];
      state.selects = [];
      saveObject('@cart', state.cart);
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
  extraReducers(builder) {
    builder
      .addCase(loadStorageCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('storage/cart/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('storage/cart/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('storage/cart/rejected'),
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});

export const {
  addOrder,
  setAllSelects,
  cancleSelect,
  updateSelects,
  removeOrder,
  removeSelects,
} = cartSlice.actions;
export default cartSlice.reducer;
