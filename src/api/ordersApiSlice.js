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
      query: (orderId) => ({
        url: `/orders/fulfill/${orderId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetStoreOrdersQuery,
  useGetSingleOrderQuery,
  useFulfillOrderMutation,
} = ordersApiSlice;
