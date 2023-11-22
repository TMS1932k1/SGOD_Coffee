import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Coffee, CoffeeResponse} from '../../types/coffee';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface coffeesState {
  coffees: Coffee[];
  totals: number;
  page: number;
  error?: string;
  isLoading: boolean;
}

const initialState: coffeesState = {
  coffees: [],
  totals: 0,
  page: 0,
  isLoading: true,
};

// GET fetch coffees with category's id
// Return event response
export const getCoffeesWithCategory = createAsyncThunk(
  'get/coffees',
  async (
    data: {idCategory: string; page?: number},
    {dispatch},
  ): Promise<CoffeeResponse> => {
    await delayTime(2000);

    if (data.idCategory === '1') {
      if (data.page === 2) {
        return require('../../assets/data/dummy_cappuccinos_page_two.json') as CoffeeResponse;
      }
      if (data.page === 3) {
        return require('../../assets/data/dummy_cappuccinos_page_three.json') as CoffeeResponse;
      }
      return require('../../assets/data/dummy_cappuccinos_page_one.json') as CoffeeResponse;
    }

    if (data.idCategory === '2') {
      return require('../../assets/data/dummy_machiato.json') as CoffeeResponse;
    }

    if (data.idCategory === '3') {
      return require('../../assets/data/dummy_latte.json') as CoffeeResponse;
    }

    if (data.idCategory === '4') {
      return require('../../assets/data/dummy_mocha.json') as CoffeeResponse;
    }

    return {
      error: 'Fetching get coffee failured!',
      coffees: [],
      page: 0,
      totals: 0,
    };
  },
);

export const coffeesSlice = createSlice({
  name: 'coffees',
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
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/coffees/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/coffees/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/coffees/rejected'),
        (state, action) => {
          state.coffees = [];
          state.totals = 0;
          state.page = 0;
          state.isLoading = false;
        },
      );
  },
});

export const {} = coffeesSlice.actions;
export default coffeesSlice.reducer;
