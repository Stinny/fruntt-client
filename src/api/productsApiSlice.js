import { apiSlice } from './apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

// const productsAdapter = createEntityAdapter();

// const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      keepUnusedDataFor: 5,
      // transformResponse: (responData) => {
      //   return productsAdapter.setAll(initialState, responData);
      // },
    }),
    getProduct: builder.query({
      query: ({ productId }) => `/products/${productId}`,
      keepUnusedDataFor: 5,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products/create',
        method: 'POST',
        body: { ...product },
      }),
    }),
    addProductImages: builder.mutation({
      query: ({ images }) => ({
        url: '/products/imageupload',
        method: 'POST',
        body: { productImages: images },
      }),
    }),
    updateProduct: builder.mutation({
      query: (product, productId) => ({
        url: `/products/update/${productId}`,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/delete/:productId`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;

// const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

// const selectProductsData = createSelector(
//   selectProductsResult,
//   (productsResult) => productsResult.data
// );

// export const {
//   selectAll: selectAllProducts,
//   selectById: selectProductById,
// } = productsAdapter.getSelectors(
//   (state) => selectProductsData(state) ?? initialState
// );
