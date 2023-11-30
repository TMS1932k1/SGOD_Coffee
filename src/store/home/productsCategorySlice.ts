import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Product, ProductsResponse} from '../../types/product';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface productsCategoryState {
  page: number;
  totalPage: number;
  products: Product[];
  error?: string;
  isLoading: boolean;
}

const initialState: productsCategoryState = {
  page: 0,
  totalPage: 0,
  products: [],
  isLoading: true,
};

// GET fetch products with category's id
// Return products page response
export const getProductsWithCategory = createAsyncThunk(
  'get/productsCategory',
  async (idCategory: string): Promise<ProductsResponse> => {
    await delayTime(1000);

    if (idCategory === '1') {
      return require('../../assets/data/dummy_coffee_one.json') as ProductsResponse;
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
      page: 0,
      totalPage: 0,
      error: 'Fetching get product failured!',
      products: [],
    };
  },
);

// GET fetch get more products with category's id and page
// Return products list
export const postMoreProductsWithCategory = createAsyncThunk(
  'moreProductCategory',
  async (data: {idCategory: string; page: number}) => {
    await delayTime(500);

    if (data.idCategory === '1') {
      if (data.page === 2) {
        return require('../../assets/data/dummy_coffee_two.json') as ProductsResponse;
      }
      if (data.page === 3) {
        return require('../../assets/data/dummy_coffee_three.json') as ProductsResponse;
      }
    }
    return {
      page: 0,
      totalPage: 0,
      error: 'Fetching load more product failured!',
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
        state.page = action.payload.page;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(postMoreProductsWithCategory.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.products = [...state.products, ...action.payload.products];
          state.page = action.payload.page;
          state.totalPage = action.payload.totalPage;
        }
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
