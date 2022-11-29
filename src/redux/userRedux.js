import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    selectedStore: '',
    selectedStoreUrl: '',
  },
  reducers: {
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setSelectedStoreUrl: (state, action) => {
      state.selectedStoreUrl = action.payload;
    },
  },
});

export const {
  setSelectedStore,
  setStoreIds,
  setSelectedStoreUrl,
} = userSlice.actions;

export default userSlice.reducer;
