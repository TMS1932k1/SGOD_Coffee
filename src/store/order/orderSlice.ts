import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order, Volume} from '../../types/order';
import {volumes} from '../../constants';
import {Product} from '../../types/product';

interface orderState {
  product?: Product;
  amount: number;
  volume: Volume;
  note?: string;
  order?: Omit<Order, 'id'>;
  total: number;
}

const initialState: orderState = {
  amount: 1,
  volume: volumes[0],
  total: 0,
};

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
    setNote: (state, action: PayloadAction<string | undefined>) => {
      state.note = action.payload;
    },
    setTotal: state => {
      let total = state.product!.price * state.amount;
      if (state.product!.type === 'drink') {
        total += state.volume.priceAdd * state.amount;
      }
      state.total = total;
      state.order = {
        product: state.product!,
        amount: state.amount,
        volume: state.product!.type === 'drink' ? volumes[0] : undefined,
        note: state.note,
        total: state.total,
      };
    },
  },
});

export const {setInitOrder, setAmount, setVolume, setNote, setTotal} =
  orderSlice.actions;
export default orderSlice.reducer;
