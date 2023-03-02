import { apiSlice } from './apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ storeId }) => `/products/client/${storeId}`,
    }),
    getProduct: builder.query({
      query: ({ productId }) => `/products/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products/create',
        method: 'POST',
        body: { ...product },
      }),
    }),
    addDigitalProduct: builder.mutation({
      query: (product) => ({
        url: '/products/create/digital',
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
    updateDigitalProduct: builder.mutation({
      query: ({
        productId,
        price,
        title,
        description,
        published,
        coverImageUrl,
        coverImageKey,
        files,
        digitalType,
        link,
      }) => ({
        url: `/products/editdigital/${productId}`,
        method: 'POST',
        body: {
          title: title,
          description: description,
          price: price,
          published: published,
          coverImageUrl: coverImageUrl,
          coverImageKey: coverImageKey,
          files: files,
          digitalType: digitalType,
          link: link,
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
    deleteFile: builder.mutation({
      query: ({ productId, fileId, key }) => ({
        url: `/products/file/delete/`,
        method: 'POST',
        body: {
          productId: productId,
          fileId: fileId,
          key: key,
        },
      }),
    }),
    getItemImages: builder.query({
      query: (productId) => `/products/images/${productId}`,
      keepUnusedDataFor: 5,
    }),
    getCoverImage: builder.query({
      query: (productId) => `/products/coverimage/${productId}`,
    }),
    getFiles: builder.query({
      query: (productId) => `/products/files/${productId}`,
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
  useAddDigitalProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateDigitalProductMutation,
  useDeleteItemImageMutation,
  useGetItemImagesQuery,
  useGetCoverImageQuery,
  useAddFAQMutation,
  useDeleteFAQMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = productsApiSlice;
