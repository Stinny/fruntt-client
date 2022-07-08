import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: Cookies.get('currentUser')
      ? JSON.parse(Cookies.get('currentUser'))
      : null,
    isLoading: false,
    error: false,
    authenticated: Cookies.get('isAuth')
      ? JSON.parse(Cookies.get('isAuth'))
      : null,
  },
  reducers: {
    //logging a user in
    loginStart: (state) => {
      state.isLoading = true;
      state.error = false;
      state.authenticated = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.authenticated = true; //sets it for the app state, but is persisted in local storage
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.error = true;
      state.authenticated = false;
    },

    //logging a user out
    logout: (state) => {
      state.currentUser = null;
      state.authenticated = false;
    },

    //registering a new user
    signupStart: (state) => {
      state.isLoading = true;
      state.error = false;
      state.authenticated = false;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.authenticated = true;
    },
    signupFailure: (state) => {
      state.isLoading = false;
      state.error = true;
      state.authenticated = false;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {},
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
