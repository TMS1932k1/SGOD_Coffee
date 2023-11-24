import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Product, ProductsResponse} from '../../types/product';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface productsCategoryState {
  products: Product[];
  error?: string;
  isLoading: boolean;
}

const initialState: productsCategoryState = {
  products: [],
  isLoading: true,
};

// GET fetch coffees with category's id
// Return coffees page response
export const getProductsWithCategory = createAsyncThunk(
  'get/productsCategory',
  async (idCategory: string): Promise<ProductsResponse> => {
    await delayTime(1000);

    if (idCategory === '1') {
      return require('../../assets/data/dummy_coffee.json') as ProductsResponse;
    }

    if (idCategory === '2') {
      return require('../../assets/data/dummy_tea.json') as ProductsResponse;
    }

    if (idCategory === '3') {
      return require('../../assets/data/dummy_cake.json') as ProductsResponse;
    }

    if (idCategory === '4') {
      return require('../../assets/data/dummy_fried_ball.json') as ProductsResponse;
    }

    return {
      error: 'Fetching get coffee failured!',
      products: [],
    };
  },
);

export const productsCategorySlice = createSlice({
  name: 'productsCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductsWithCategory.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.error = action.payload.error;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/productsCategory/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/productsCategory/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/productsCategory/rejected'),
        (state, action) => {
          state.products = [];
          if (!action.meta.aborted) state.isLoading = false;
        },
      );
  },
});

export const {} = productsCategorySlice.actions;
export default productsCategorySlice.reducer;
