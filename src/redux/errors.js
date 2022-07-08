import { createSlice } from '@reduxjs/toolkit';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    error: '',
  },
  reducers: {
    createError: (state, action) => {
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = '';
    },
  },
});

export const { createError, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
