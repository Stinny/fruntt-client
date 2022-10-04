import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreOrders: builder.query({
      query: () => '/orders/store',
      keepUnusedDataFor: 5,
    }),
    getSingleOrder: builder.query({
      query: ({ orderId }) => `/orders/${orderId}`,
    }),
    fulfillOrder: builder.mutation({
      query: ({ orderId, trackingNum, fulfillType }) => ({
        url: `/orders/fulfill/${orderId}`,
        method: 'POST',
        body: {
          trackingNum: trackingNum,
          fulfillType: fulfillType,
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
  }),
});

export const {
  useGetStoreOrdersQuery,
  useGetSingleOrderQuery,
  useFulfillOrderMutation,
  useEditShippingAddressMutation,
} = ordersApiSlice;
