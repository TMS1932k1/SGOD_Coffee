import {AsyncThunk, configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import appSlice from './app/appSlice';
import eventsSlice from './home/eventsSlice';
import categoriesSlice from './home/categoriesSlice';
import productsCategorySlice from './home/productsCategorySlice';
import searchSlice from './home/searchSlice';
import orderSlice from './order/orderSlice';
import addressSlice from './shipto/addressSlice';
import cartSlice from './cart/cartSlice';
import paySlice from './pay/paySlice';

export const store = configureStore({
  reducer: {
    authState: authSlice,
    appState: appSlice,
    eventsState: eventsSlice,
    categoriesState: categoriesSlice,
    productsCategoryState: productsCategorySlice,
    searchState: searchSlice,
    orderState: orderSlice,
    addressState: addressSlice,
    cartState: cartSlice,
    payState: paySlice,
  },
});

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
