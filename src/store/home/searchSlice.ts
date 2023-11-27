import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductsResponse} from '../../types/product';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface searchState {
  page: number;
  totalPage: number;
  products: Product[];
  error?: string;
  searchText?: string;
  isLoading: boolean;
}

const initialState: searchState = {
  page: 0,
  totalPage: 0,
  products: [],
  isLoading: true,
};

// GET fetch coffees with search string
// Return coffees page response
export const getProductssWithSearch = createAsyncThunk(
  'get/search',
  async (search: string): Promise<ProductsResponse> => {
    await delayTime(1000);

    return search.length > 0
      ? (require('../../assets/data/dummy_coffee_one.json') as ProductsResponse)
      : {
          page: 0,
          totalPage: 0,
          error: 'Fetching get coffee failured!',
          products: [],
        };
  },
);

// GET fetch get more products with textd and page
// Return products list
export const postMoreProductsWithSearch = createAsyncThunk(
  'more',
  async (data: {search: string; page: number}) => {
    await delayTime(1000);

    if (data.page === 2) {
      return require('../../assets/data/dummy_coffee_two.json') as ProductsResponse;
    }
    if (data.page === 3) {
      return require('../../assets/data/dummy_coffee_three.json') as ProductsResponse;
    }

    return {
      page: 0,
      totalPage: 0,
      error: 'Fetching load more product failured!',
      products: [],
    };
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.length > 0 ? action.payload : undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductssWithSearch.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.error = action.payload.error;
        state.page = action.payload.page;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(postMoreProductsWithSearch.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.products = [...state.products, ...action.payload.products];
          state.page = action.payload.page;
          state.totalPage = action.payload.totalPage;
        }
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/search/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/search/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/search/rejected'),
        (state, action) => {
          state.products = [];
          if (!action.meta.aborted) state.isLoading = false;
        },
      );
  },
});

export const {setSearchText} = searchSlice.actions;
export default searchSlice.reducer;
