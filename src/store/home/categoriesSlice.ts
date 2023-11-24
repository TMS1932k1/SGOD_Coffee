import {CategoriesResponse, Category} from '../../types/category';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {getProductsWithCategory} from './productsCategorySlice';

interface categoriesState {
  categories: Category[];
  currentIndex: number;
  currentId?: string;
  error?: string;
  isLoading: boolean;
}

const initialState: categoriesState = {
  categories: [],
  currentIndex: 0,
  isLoading: true,
};

// GET fetch categories array
// Return event response
export const getCategories = createAsyncThunk(
  'get/categories',
  async (_, {dispatch}): Promise<CategoriesResponse> => {
    await delayTime(2000);
    const categories =
      require('../../assets/data/dummy_category.json') as Category[];
    dispatch(getProductsWithCategory(categories[0].id));
    return true
      ? {categories: categories}
      : {categories: [], error: 'Fetching categories is failured!'};
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
      state.currentId = state.categories[action.payload].id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.error = action.payload.error;
        state.currentId = state.categories[state.currentIndex].id;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/categories/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/categories/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/categories/rejected'),
        (state, action) => {
          state.categories = [];
          state.isLoading = false;
        },
      );
  },
});

export const {setCurrentIndex} = categoriesSlice.actions;
export default categoriesSlice.reducer;
