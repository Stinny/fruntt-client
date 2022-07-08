import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
  },
  reducers: {},
});

export const {
  setProductData,
  addProductToData,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
