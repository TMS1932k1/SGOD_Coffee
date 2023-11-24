import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductsResponse} from '../../types/product';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface searchState {
  products: Product[];
  error?: string;
  searchText?: string;
  isLoading: boolean;
}

const initialState: searchState = {
  products: [],
  isLoading: true,
};

// GET fetch coffees with search string
// Return coffees page response
export const getCoffeesWithSearch = createAsyncThunk(
  'get/search',
  async (search: string): Promise<ProductsResponse> => {
    await delayTime(1000);

    return search.length > 0
      ? (require('../../assets/data/dummy_coffee.json') as ProductsResponse)
      : {
          error: 'Fetching get coffee failured!',
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
      .addCase(getCoffeesWithSearch.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.error = action.payload.error;
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
