import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location, Order} from '../../types/order';
import {Store, StoreResponse} from '../../types/store';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {PayMethod} from '../../types/pay';
import {payMethods} from '../../constants';
import {getAddPoint} from '../../utils/rankUser';

interface confirmState {
  orders: Order[];
  isShip: boolean;
  shipTo?: Location;
  phone?: string;
  stores?: Store[];
  isLoadingStores: boolean;
  store?: Store;
  payMetthod: PayMethod;
  total: number;
  errorStores?: string;
  addPoint: number;
}

const initialState: confirmState = {
  orders: [],
  isShip: false,
  payMetthod: payMethods[0],
  isLoadingStores: false,
  total: 0,
  addPoint: 0,
};

// GET fetch all location of stores
// Return store response
export const getStoresArray = createAsyncThunk(
  'stores',
  async (): Promise<StoreResponse> => {
    await delayTime(1000);
    return require('../../assets/data/dummy_stores.json') as StoreResponse;
  },
);

export const confirmSlice = createSlice({
  name: 'pay',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setStore: (state, action: PayloadAction<Store>) => {
      state.store = action.payload;
    },
    setIsShip: (state, action: PayloadAction<boolean>) => {
      state.isShip = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.shipTo = action.payload;
    },
    setPayMethhod: (state, action: PayloadAction<PayMethod>) => {
      state.payMetthod = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
      state.addPoint = Math.round(getAddPoint(state.total));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStoresArray.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.stores = action.payload.stores!;
          state.store = state.stores[0];
        } else {
          state.stores = [];
          state.errorStores = action.payload.error;
        }
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('stores/fulfilled'),
        (state, action) => {
          state.isLoadingStores = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('stores/pending'),
        (state, action) => {
          state.isLoadingStores = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('stores/rejected'),
        (state, action) => {
          state.stores = [];
          state.isLoadingStores = false;
        },
      );
  },
});

export const {
  setOrders,
  setStore,
  setIsShip,
  setPhone,
  setLocation,
  setPayMethhod,
  setTotal,
} = confirmSlice.actions;
export default confirmSlice.reducer;
