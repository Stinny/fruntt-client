import { apiSlice } from './apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ storeId }) => `/products/client/${storeId}`,
    }),
    getMarketProducts: builder.query({
      query: ({ filter }) => `/products/market/${filter}`,
    }),
    getFeaturedProducts: builder.query({
      query: () => `/products/featured/c`,
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

    updateDigitalProduct: builder.mutation({
      query: ({
        productId,
        price,
        title,
        description,
        published,
        coverImageUrl,
        coverImageKey,
        coverImage,
        files,
        digitalType,
        content,
        info,
        payChoice,
        suggestedPrice,
        callToAction,
        url,
        free,
        marketplace,
        category,
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
          content: content,
          info: info,
          payChoice: payChoice,
          suggestedPrice: suggestedPrice,
          callToAction: callToAction,
          url: url,
          free: free,
          marketplace: marketplace,
          category: category,
          coverImage: coverImage,
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
    addDescription: builder.mutation({
      query: ({ productId, description }) => ({
        url: `/products/description/add`,
        method: 'POST',
        body: {
          productId: productId,
          description: description,
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
  useUpdateDigitalProductMutation,
  useDeleteItemImageMutation,
  useGetItemImagesQuery,
  useGetCoverImageQuery,
  useAddFAQMutation,
  useDeleteFAQMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
  useAddDescriptionMutation,
  useGetMarketProductsQuery,
  useGetFeaturedProductsQuery,
} = productsApiSlice;
