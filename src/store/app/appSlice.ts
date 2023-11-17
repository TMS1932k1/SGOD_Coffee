import {createSlice} from '@reduxjs/toolkit';

interface appState {
  isFirstOpenApp: boolean;
}

const initialState: appState = {
  isFirstOpenApp: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstOpenApp: state => {
      state.isFirstOpenApp = false;
    },
  },
});

export const {setFirstOpenApp} = appSlice.actions;
export default appSlice.reducer;
