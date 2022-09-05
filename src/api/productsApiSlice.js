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
    updateProduct: builder.mutation({
      query: ({
        productId,
        formTitle,
        formDescription,
        formPrice,
        formStock,
        formPublished,
        formWeightUnit,
        formSizeUnit,
        formWeight,
        formHeight,
        formLength,
        formWidth,
        imageData,
      }) => ({
        url: `/products/edit/${productId}`,
        method: 'POST',
        body: {
          title: formTitle,
          description: formDescription,
          price: formPrice,
          stock: formStock,
          published: formPublished,
          weightUnit: formWeightUnit,
          sizeUnit: formSizeUnit,
          weight: formWeight,
          height: formHeight,
          width: formWidth,
          length: formLength,
          imageData: imageData,
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/delete/${productId}`,
        method: 'DELETE',
      }),
    }),
    deleteItemImage: builder.mutation({
      query: ({ productId, imgId, key }) => ({
        url: `/products/image/delete/`,
        method: 'POST',
        body: {
          productId: productId,
          imgId: imgId,
          key: key,
        },
      }),
    }),
    getItemImages: builder.query({
      query: (productId) => `/products/images/${productId}`,
      keepUnusedDataFor: 5,
    }),
    addFAQ: builder.mutation({
      query: ({ productId, question, answer }) => ({
        url: `/products/addfaq`,
        method: 'POST',
        body: {
          productId: productId,
          question: question,
          answer: answer,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteItemImageMutation,
  useGetItemImagesQuery,
  useAddFAQMutation,
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
