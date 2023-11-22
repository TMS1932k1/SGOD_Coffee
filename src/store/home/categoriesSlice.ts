import {CategoriesResponse, Category} from '../../types/category';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {delayTime} from '../../utils/delayTime';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {getCoffeesWithCategory} from './coffeesSlice';

interface categoriesState {
  categories: Category[];
  error?: string;
  isLoading: boolean;
}

const initialState: categoriesState = {
  categories: [],
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
    dispatch(getCoffeesWithCategory({idCategory: categories[0].id}));
    return true
      ? {categories: categories}
      : {categories: [], error: 'Fetching categories is failured!'};
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.error = action.payload.error;
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

export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
