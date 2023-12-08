import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Product} from '../../types/product';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';

interface favoriteState {
  favorites: Product[];
  isLoading: boolean;
}

const initialState: favoriteState = {
  favorites: [],
  isLoading: false,
};

export const getAllFavorites = createAsyncThunk(
  'all/favorite',
  async (idUser: string) => {
    await delayTime(1000);
    if (idUser == '1') {
      return require('../../assets/data/dummy_favorites.json') as Product[];
    }
    return [];
  },
);

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites = [action.payload, ...state.favorites];
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload,
      );
    },
    removeAllFavorites: state => {
      state.favorites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('all/favorite/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('all/favorite/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('all/favorite/rejected'),
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});

export const {addFavorite, removeFavorite, removeAllFavorites} =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
