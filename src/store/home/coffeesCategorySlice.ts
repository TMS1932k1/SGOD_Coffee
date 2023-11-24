import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Coffee, CoffeesPageResponse} from '../../types/coffee';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface coffeesCategoryState {
  coffees: Coffee[];
  totals: number;
  page: number;
  error?: string;
  isLoading: boolean;
}

const initialState: coffeesCategoryState = {
  coffees: [],
  totals: 0,
  page: 0,
  isLoading: true,
};

// GET fetch coffees with category's id
// Return coffees page response
export const getCoffeesWithCategory = createAsyncThunk(
  'get/coffeesCategory',
  async (idCategory: string): Promise<CoffeesPageResponse> => {
    await delayTime(1000);

    if (idCategory === '1') {
      return require('../../assets/data/dummy_cappuccinos_page_one.json') as CoffeesPageResponse;
    }

    if (idCategory === '2') {
      return require('../../assets/data/dummy_machiato.json') as CoffeesPageResponse;
    }

    if (idCategory === '3') {
      return require('../../assets/data/dummy_latte.json') as CoffeesPageResponse;
    }

    if (idCategory === '4') {
      return require('../../assets/data/dummy_mocha.json') as CoffeesPageResponse;
    }

    return {
      error: 'Fetching get coffee failured!',
      coffees: [],
      page: 0,
      totals: 0,
    };
  },
);

// GET fetch load more coffees with category's id and page
// Return coffees page response
export const getLoadMoreCoffees = createAsyncThunk(
  'more',
  async (data: {
    idCategory: string;
    page?: number;
  }): Promise<CoffeesPageResponse> => {
    await delayTime(1000);

    if (data.idCategory === '1') {
      if (data.page === 2) {
        return require('../../assets/data/dummy_cappuccinos_page_two.json') as CoffeesPageResponse;
      }
      if (data.page === 3) {
        return require('../../assets/data/dummy_cappuccinos_page_three.json') as CoffeesPageResponse;
      }
    }

    return {
      coffees: [],
      page: 0,
      totals: 0,
    };
  },
);

export const coffeesCategorySlice = createSlice({
  name: 'coffeesCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCoffeesWithCategory.fulfilled, (state, action) => {
        state.coffees = action.payload.coffees;
        state.totals = action.payload.totals;
        state.error = action.payload.error;
        state.page = action.payload.page;
      })
      .addCase(getLoadMoreCoffees.fulfilled, (state, action) => {
        state.coffees = [...state.coffees, ...action.payload.coffees];
        state.totals = action.payload.totals;
        state.error = action.payload.error;
        state.page = action.payload.page;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/coffeesCategory/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/coffeesCategory/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/coffeesCategory/rejected'),
        (state, action) => {
          state.coffees = [];
          state.totals = 0;
          state.page = 0;
          if (!action.meta.aborted) state.isLoading = false;
        },
      );
  },
});

export const {} = coffeesCategorySlice.actions;
export default coffeesCategorySlice.reducer;
