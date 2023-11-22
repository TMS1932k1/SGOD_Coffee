import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Event} from '../../types/event';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface eventsState {
  events: Event[];
  error?: string;
  isLoading: boolean;
}

const initialState: eventsState = {
  events: [],
  isLoading: true,
};

// GET fetch events array
// Return event response
export const getEvents = createAsyncThunk('get/events', async () => {
  await delayTime(2000);
  const events = require('../../assets/data/dummy_event.json');
  return true ? {events: events} : {error: 'Fetching events is failured!'};
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.error = action.payload.error;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/events/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/events/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/events/rejected'),
        (state, action) => {
          state.events = [];
          state.isLoading = false;
        },
      );
  },
});

export const {} = eventsSlice.actions;
export default eventsSlice.reducer;
