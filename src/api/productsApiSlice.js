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
        formWeight,
        formAddress,
        formCity,
        formCountry,
        formState,
        formZip,
        formOptions,
        formShippingPrice,
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
          weight: formWeight,
          options: formOptions,
          address: formAddress,
          country: formCountry,
          state: formState,
          city: formCity,
          zipcode: formZip,
          shippingPrice: formShippingPrice,
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
    deleteFAQ: builder.mutation({
      query: ({ productId, faqId }) => ({
        url: `/products/deletefaq`,
        method: 'POST',
        body: {
          productId: productId,
          faqId: faqId,
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
  useDeleteFAQMutation,
} = productsApiSlice;
