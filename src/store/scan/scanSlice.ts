import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Bill} from '../../types/bill';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface scanState {
  bill?: Bill;
  isLoading: boolean;
}

const initialState: scanState = {
  isLoading: false,
};

export const fetchBillWithId = createAsyncThunk('scan', async (id: string) => {
  await delayTime(1000);
  if (id === '1701917651841') {
    return require('../../assets/data/scan_bill.json') as Bill;
  } else {
    return undefined;
  }
});

export const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setInit: state => {
      state.bill = undefined;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBillWithId.fulfilled, (state, action) => {
        state.bill = action.payload;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('scan/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('scan/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('scan/rejected'),
        (state, action) => {
          state.bill = undefined;
          state.isLoading = false;
        },
      );
  },
});

export const {setInit} = scanSlice.actions;
export default scanSlice.reducer;
