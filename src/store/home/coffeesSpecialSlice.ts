import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Coffee} from '../../types/coffee';
import {delayTime} from '../../utils/delayTime';
import {CoffeesSpecialResponse} from '../../types/coffee/CoffeesSpecialResponse';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface coffeesSpecialState {
  coffees: Coffee[];
  specialText: string;
  error?: string;
  isLoading: boolean;
}

const initialState: coffeesSpecialState = {
  coffees: [],
  specialText: '',
  isLoading: true,
};

// GET list of special coffees
// Return response
export const getCoffeesSpecial = createAsyncThunk(
  'get/coffeesSpecial',
  async (): Promise<CoffeesSpecialResponse> => {
    await delayTime(2000);
    return require('../../assets/data/dummy_special_coffee.json') as CoffeesSpecialResponse;
  },
);

export const coffeesSpecialSlice = createSlice({
  name: 'coffeesSpecial',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCoffeesSpecial.fulfilled, (state, action) => {
        state.coffees = action.payload.coffees;
        state.error = action.payload.error;
        state.specialText = action.payload.specialText ?? '';
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/coffeesSpecial/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/coffeesSpecial/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/coffeesSpecial/rejected'),
        (state, action) => {
          console.log('reject');
          state.coffees = [];
          state.isLoading = false;
        },
      );
  },
});

export const {} = coffeesSpecialSlice.actions;
export default coffeesSpecialSlice.reducer;
