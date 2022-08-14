import { createSlice } from '@reduxjs/toolkit';

export const designSlice = createSlice({
  name: 'design',
  initialState: {
    pageBG: '',
  },
  reducers: {
    setPageBckGrnd: (state, action) => {
      state.pageBG = action.payload;
    },
  },
});

export const { setPageBckGrnd } = designSlice.actions;

export default designSlice.reducer;
