import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreOrders: builder.query({
      query: ({ storeId }) => `/orders/store/${storeId}`,
      keepUnusedDataFor: 5,
    }),
    getSingleOrder: builder.query({
      query: ({ orderId }) => `/orders/${orderId}`,
    }),
    getDigitalOrder: builder.query({
      query: ({ orderId }) => `/orders/digital/${orderId}`,
    }),
    getUsersOrders: builder.query({
      query: () => `/orders/userorders`,
    }),
    getShippingRates: builder.query({
      query: ({ orderId }) => `/orders/rates/${orderId}`,
    }),
    getReviews: builder.query({
      query: ({ storeId }) => `/orders/reviews/${storeId}`,
    }),
    getReview: builder.query({
      query: ({ reviewId }) => `/orders/reviews/r/${reviewId}`,
    }),
    fulfillOrder: builder.mutation({
      query: ({ orderId, trackingNum, fulfillType, carrierCode }) => ({
        url: `/orders/fulfill/${orderId}`,
        method: 'POST',
        body: {
          trackingNum: trackingNum,
          fulfillType: fulfillType,
          carrierCode: carrierCode,
        },
      }),
    }),
    markAsViewed: builder.mutation({
      query: ({ orderId }) => ({
        url: `/orders/view/${orderId}`,
        method: 'POST',
      }),
    }),
    getShippingLabel: builder.mutation({
      query: ({ orderId, rateId, amount }) => ({
        url: `/orders/shippinglabel`,
        method: 'POST',
        body: {
          rateId: rateId,
          orderId: orderId,
          amount: amount,
        },
      }),
    }),
    addProductReview: builder.mutation({
      query: ({ orderId, email, review, rating, name }) => ({
        url: `/orders/add/review`,
        method: 'POST',
        body: {
          orderId: orderId,
          email: email,
          review: review,
          rating: rating,
          name: name,
        },
      }),
    }),
    editShippingAddress: builder.mutation({
      query: ({ orderId, address, country, state, city, zipcode }) => ({
        url: '/orders/shippingaddress',
        method: 'POST',
        body: {
          orderId: orderId,
          country: country,
          address: address,
          state: state,
          city: city,
          zipcode: zipcode,
        },
      }),
    }),
    editShipsFromAddress: builder.mutation({
      query: ({ orderId, address, country, state, city, zipcode }) => ({
        url: '/orders/update/shipsfrom',
        method: 'POST',
        body: {
          orderId: orderId,
          country: country,
          address: address,
          state: state,
          city: city,
          zipcode: zipcode,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ total, item, qty, options, storeId }) => ({
        url: '/orders/create/',
        method: 'POST',
        body: {
          total: total,
          item: item,
          qty: qty,
          storeId: storeId,
          options: options,
        },
      }),
    }),
  }),
});

export const {
  useGetStoreOrdersQuery,
  useGetSingleOrderQuery,
  useGetDigitalOrderQuery,
  useGetShippingRatesQuery,
  useGetUsersOrdersQuery,
  useFulfillOrderMutation,
  useEditShippingAddressMutation,
  useGetShippingLabelMutation,
  useEditShipsFromAddressMutation,
  useAddProductReviewMutation,
  useMarkAsViewedMutation,
  useGetReviewsQuery,
  useGetReviewQuery,
  useCreateOrderMutation,
  useLazyGetSingleOrderQuery,
} = ordersApiSlice;
