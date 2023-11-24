import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coffee, CoffeesPageResponse} from '../../types/coffee';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface searchState {
  coffees: Coffee[];
  totals: number;
  page: number;
  error?: string;
  searchText?: string;
  isLoading: boolean;
}

const initialState: searchState = {
  coffees: [],
  totals: 0,
  page: 0,
  isLoading: true,
};

// GET fetch coffees with search string
// Return coffees page response
export const getCoffeesWithSearch = createAsyncThunk(
  'get/search',
  async (search: string): Promise<CoffeesPageResponse> => {
    await delayTime(1000);

    return search.length > 0
      ? (require('../../assets/data/dummy_cappuccinos_page_one.json') as CoffeesPageResponse)
      : {
          error: 'Fetching get coffee failured!',
          coffees: [],
          page: 0,
          totals: 0,
        };
  },
);

// POST get coffees with search text and page
// Return coffees page response
export const getLoadMoreSearchCoffees = createAsyncThunk(
  'more',
  async (page: number): Promise<CoffeesPageResponse> => {
    await delayTime(1000);

    if (page === 2) {
      return require('../../assets/data/dummy_cappuccinos_page_two.json') as CoffeesPageResponse;
    }
    if (page === 3) {
      return require('../../assets/data/dummy_cappuccinos_page_three.json') as CoffeesPageResponse;
    }

    return {
      coffees: [],
      page: 0,
      totals: 0,
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
        state.coffees = action.payload.coffees;
        state.totals = action.payload.totals;
        state.error = action.payload.error;
        state.page = action.payload.page;
      })
      .addCase(getLoadMoreSearchCoffees.fulfilled, (state, action) => {
        state.coffees = [...state.coffees, ...action.payload.coffees];
        state.totals = action.payload.totals;
        state.error = action.payload.error;
        state.page = action.payload.page;
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
          state.coffees = [];
          state.totals = 0;
          state.page = 0;
          if (!action.meta.aborted) state.isLoading = false;
        },
      );
  },
});

export const {setSearchText} = searchSlice.actions;
export default searchSlice.reducer;
