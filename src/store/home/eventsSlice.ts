import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Event} from '../../types/event';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface eventsState {
  events?: Event[];
  error?: string;
  isLoading: boolean;
}

const initialState: eventsState = {
  events: [],
  isLoading: true,
};

// GET fetch events array
// Return event response
export const getEvents = createAsyncThunk('home/events', async () => {
  await delayTime(2000);
  const events = require('../../assets/data/dummy_event.json');
  return true ? {events: events} : {error: 'Fetching events is failured!'};
});

export const eventsSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('rejected'),
        (state, action) => {
          state.events = undefined;
          state.isLoading = false;
        },
      );
  },
});

export const {} = eventsSlice.actions;
export default eventsSlice.reducer;
