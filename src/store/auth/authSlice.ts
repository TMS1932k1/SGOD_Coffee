import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {asyncStorageHelper, delayTimeHelper} from '../../utils';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {
  ForgotForm,
  SignInForm,
  SignUpForm,
  User,
  UserResponse,
} from '../../types';

interface authState {
  user?: User;
  errorMes?: string;
  isLoading: boolean;
}

const initialState: authState = {
  isLoading: false,
};

// POST verification api: verify otp codes
//  Return type user when verification is sucessfull
//  Return undifine when verification is failured
export const postVerification = createAsyncThunk(
  'auth/verification',
  async (data: {otp: string; email: string}): Promise<UserResponse> => {
    await delayTimeHelper.delayTime(2000);
    return data.otp === '1234' && data.email === 'tms1932k1@gmail.com'
      ? {user: require('../../assets/data/dummy_user.json') as User}
      : {error: 'Verification is failured!'};
  },
);

// POST sign in api: sign in with email and password
//  Return type user when signing in is sucessfull
//  Return undifine when signing in is failured
export const postSignIn = createAsyncThunk(
  'auth/signin',
  async (data: SignInForm): Promise<UserResponse> => {
    await delayTimeHelper.delayTime(2000);
    return data.password === 'dt0932782114' &&
      data.email === 'tms1932k1@gmail.com'
      ? {user: require('../../assets/data/dummy_user.json') as User}
      : {error: 'Sign in is failured!'};
  },
);

// POST sign up api: sign up with email, password, username and phone
//  Return undefine when signing up is sucessfull
//  Return errors when signing up is failured
export const postSignUp = createAsyncThunk(
  'auth/signup',
  async (data: SignUpForm): Promise<string | undefined> => {
    await delayTimeHelper.delayTime(2000);
    return data.password === 'dt0932782114' &&
      data.email === 'tms1932k1@gmail.com'
      ? undefined
      : 'Sign up is failured!';
  },
);

// POST forgot password api: request create new password to account from email
//  Return undefine when requesting is sucessfull
//  Return errors when requesting is failured
export const postforgotPassword = createAsyncThunk(
  'auth/forgot',
  async (data: ForgotForm): Promise<string | undefined> => {
    await delayTimeHelper.delayTime(2000);
    return data.email === 'tms1932k1@gmail.com'
      ? undefined
      : 'Request to get password failured!';
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeErrors: state => {
      state.errorMes = undefined;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postVerification.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMes = action.payload.error;
        // Save user at local storage
        if (state.user)
          asyncStorageHelper.saveObject<User>('@user', state.user);
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMes = action.payload.error;
        // Save user at local storage
        if (state.user)
          asyncStorageHelper.saveObject<User>('@user', state.user);
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        state.errorMes = action.payload;
      })
      .addCase(postforgotPassword.fulfilled, (state, action) => {
        state.errorMes = action.payload;
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.user = undefined;
          state.isLoading = false;
        },
      )
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});

export const {removeErrors, setUser} = authSlice.actions;
export default authSlice.reducer;
