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
    getShippingRates: builder.query({
      query: ({ orderId }) => `/orders/rates/${orderId}`,
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
      query: ({ orderId, email, review, rating }) => ({
        url: `/orders/add/review`,
        method: 'POST',
        body: {
          orderId: orderId,
          email: email,
          review: review,
          rating: rating,
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
  }),
});

export const {
  useGetStoreOrdersQuery,
  useGetSingleOrderQuery,
  useGetDigitalOrderQuery,
  useGetShippingRatesQuery,
  useFulfillOrderMutation,
  useEditShippingAddressMutation,
  useGetShippingLabelMutation,
  useEditShipsFromAddressMutation,
  useAddProductReviewMutation,
} = ordersApiSlice;
