import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {billStatus} from '../../constants';
import {Bill, StatusBill} from '../../types/bill';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {addPointAuth} from '../auth/authSlice';

interface billsState {
  bills: Bill[];
  billsFilter: Bill[];
  filterStatus: StatusBill;
  isLoading: boolean;
}

const initialState: billsState = {
  bills: [],
  billsFilter: [],
  filterStatus: billStatus[0],
  isLoading: false,
};

// POST bill to user's bill in DB
// Return bill response
export const postAddBill = createAsyncThunk(
  'add/bills',
  async (bill: Bill, {dispatch}) => {
    await delayTime(1000);
    if (bill.status.title !== billStatus[0].title) {
      dispatch(addPointAuth(bill.addPoint));
    }
    return bill;
  },
);

// POST get all user's bill in DB with user'id
// Return bill response
export const postGetAllBill = createAsyncThunk(
  'all/bills',
  async (userId: string) => {
    await delayTime(1000);
    return [];
  },
);

// Post pay bill
// Return bill response
export const postPayBill = createAsyncThunk(
  'pay/bills',
  async (bill: Bill, {dispatch}) => {
    await delayTime(1000);
    dispatch(addPointAuth(bill.addPoint));
    return {...bill, status: billStatus[1]};
  },
);

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<StatusBill>) => {
      state.filterStatus = action.payload;
      state.billsFilter = state.bills.filter(
        item => item.status.title === state.filterStatus.title,
      );
    },
    removeBill: (state, action: PayloadAction<Bill[]>) => {
      state.bills = [
        ...state.bills.filter(item => {
          return action.payload.findIndex(order => order.id === item.id) === -1;
        }),
      ];
      state.billsFilter = state.bills.filter(
        item => item.status.title === state.filterStatus.title,
      );
    },
    removeAllBills: state => {
      state.bills = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postAddBill.fulfilled, (state, action) => {
        state.bills = [action.payload, ...state.bills];
        state.billsFilter = state.bills.filter(
          item => item.status.title === state.filterStatus.title,
        );
      })
      .addCase(postGetAllBill.fulfilled, (state, action) => {
        state.bills = action.payload;
        state.billsFilter = state.bills.filter(
          item => item.status.title === state.filterStatus.title,
        );
      })
      .addCase(postPayBill.fulfilled, (state, action) => {
        let index = state.bills.findIndex(
          item => item.id === action.payload.id,
        );

        if (index != -1) {
          state.bills.splice(index, 1);
          state.bills = [action.payload, ...state.bills];

          state.billsFilter = state.bills.filter(
            item => item.status.title === state.filterStatus.title,
          );
        }
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('bills/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('bills/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('bills/rejected'),
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});

export const {setFilterStatus, removeBill, removeAllBills} = billsSlice.actions;
export default billsSlice.reducer;
