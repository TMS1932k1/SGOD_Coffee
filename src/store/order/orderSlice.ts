import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location, Order, Store, StoreResponse, Volume} from '../../types/order';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {priceShip, volumes} from '../../constants';
import {Product} from '../../types/product';

interface orderState {
  product?: Product;
  amount: number;
  volume: Volume;
  store?: Store;
  note?: string;
  isShip: boolean;
  stores?: Store[];
  shipTo?: Location;
  phone?: string;
  order?: Order;
  total: number;
  isLoadingStores: boolean;
}

const initialState: orderState = {
  isLoadingStores: false,
  isShip: false,
  amount: 1,
  volume: volumes[0],
  total: 0,
};

// GET fetch all location of stores
// Return store response
export const getStoresArray = createAsyncThunk(
  'stores/order',
  async (): Promise<StoreResponse> => {
    await delayTime(1000);
    return require('../../assets/data/dummy_stores.json') as StoreResponse;
  },
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setInitOrder: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.amount = 1;
      state.volume = volumes[0];
      state.note = undefined;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setVolume: (state, action: PayloadAction<Volume>) => {
      state.volume = action.payload;
    },
    setStore: (state, action: PayloadAction<Store>) => {
      state.store = action.payload;
    },
    setNote: (state, action: PayloadAction<string | undefined>) => {
      state.note = action.payload;
    },
    setShipTo: (state, action: PayloadAction<Location>) => {
      state.shipTo = action.payload;
    },
    setIsShip: (state, action: PayloadAction<boolean>) => {
      state.isShip = action.payload;
    },
    setPhoneOrder: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setTotal: state => {
      let total = state.product!.price * state.amount;
      if (state.product!.type === 'drink') {
        total += state.volume.priceAdd;
      }
      if (state.isShip) {
        total += priceShip;
      }
      state.total = total;

      state.order = {
        id: Date.now().toString(),
        product: state.product!,
        amount: 1,
        volume: state.product!.type === 'drink' ? volumes[0] : undefined,
        store: state.store!,
        note: state.note,
        shipTo: state.isShip ? state.shipTo : undefined,
        total: state.total,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStoresArray.fulfilled, (state, action) => {
        state.stores = action.payload.stores ?? [];
        if (state.stores.length > 0) {
          state.store = state.stores[0];
        }
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('stores/order/fulfilled'),
        (state, action) => {
          state.isLoadingStores = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('stores/order/pending'),
        (state, action) => {
          state.isLoadingStores = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('stores/order/rejected'),
        (state, action) => {
          state.stores = [];
          state.isLoadingStores = false;
        },
      );
  },
});

export const {
  setInitOrder,
  setAmount,
  setVolume,
  setNote,
  setStore,
  setShipTo,
  setIsShip,
  setPhoneOrder,
  setTotal,
} = orderSlice.actions;
export default orderSlice.reducer;
