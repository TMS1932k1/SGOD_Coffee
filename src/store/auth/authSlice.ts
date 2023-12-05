import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FulfilledAction, PendingAction, RejectedAction} from '../store';
import {delayTime} from '../../utils/delayTime';
import {saveString} from '../../utils/asyncStorage';
import {
  ForgotForm,
  SignInForm,
  SignUpForm,
  User,
  UserResponse,
} from '../../types/auth';
import {postGetAllBill} from '../bill/billsSlice';

interface authState {
  user?: User;
  errorMes?: string;
  isLoading: boolean;
}

const initialState: authState = {
  isLoading: false,
};

// POST verification api: verify otp codes
// Return user response
export const postVerification = createAsyncThunk(
  'verification/auth',
  async (data: {otp: string; email: string}): Promise<UserResponse> => {
    await delayTime(2000);
    return data.otp === '1234' && data.email === 'tms1932k1@gmail.com'
      ? {user: require('../../assets/data/dummy_user.json') as User}
      : {error: 'Verification is failured!'};
  },
);

// POST sign in api: sign in with email and password
// Return user response
export const postSignIn = createAsyncThunk(
  'signin/auth',
  async (data: SignInForm): Promise<UserResponse> => {
    await delayTime(2000);
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
  'signup/auth',
  async (data: SignUpForm): Promise<string | undefined> => {
    await delayTime(2000);
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
  'forgot/auth',
  async (data: ForgotForm): Promise<string | undefined> => {
    await delayTime(2000);
    return data.email === 'tms1932k1@gmail.com'
      ? undefined
      : 'Request to get password failured!';
  },
);

// POST fetch user api: fetch user by userToken
//  Return user when getting is sucessfull
//  Return undeefined when not get user
export const postfetchUserByToken = createAsyncThunk(
  'me/auth',
  async (userToken: string, {dispatch}) => {
    await delayTime(2000);
    if (userToken == '12312312324345233') {
      let user = require('../../assets/data/dummy_user.json') as User;
      dispatch(postGetAllBill(user.id));
      return user;
    }
    return undefined;
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
        if (state.user) saveString('@userToken', state.user.refreshToken);
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMes = action.payload.error;

        // Save user at local storage
        if (state.user) saveString('@userToken', state.user.refreshToken);
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        state.errorMes = action.payload;
      })
      .addCase(postforgotPassword.fulfilled, (state, action) => {
        state.errorMes = action.payload;
      })
      .addCase(postfetchUserByToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('auth/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher<PendingAction>(
        action => action.type.endsWith('auth/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('auth/rejected'),
        (state, action) => {
          state.user = undefined;
          state.isLoading = false;
        },
      );
  },
});

export const {removeErrors, setUser} = authSlice.actions;
export default authSlice.reducer;
