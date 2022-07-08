import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import productReducer from './productRedux';
import userReducer from './userRedux';
import errors from './errors';
import Cookies from 'js-cookie';

//middle function for setting local storage
//depends on the certain action being dispatched(loginSuccessful or signupSuccess in this case)
const authMiddleware = (store) => (next) => (action) => {
  if (
    action.type === 'user/loginSuccess' ||
    action.type === 'user/signupSuccess' ||
    action.type === 'user/updateUserSuccess'
  ) {
    const currentUser = JSON.stringify(action.payload);
    Cookies.set('currentUser', currentUser);
    Cookies.set('isAuth', true);
  }

  if (action.type === 'user/logout') {
    Cookies.remove('currentUser');
    Cookies.remove('isAuth');
  }
  return next(action);
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  product: productReducer,
  user: userReducer,
  errors: errors,
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    product: productReducer,
    user: userReducer,
    errors: errors,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, apiSlice.middleware),
});
