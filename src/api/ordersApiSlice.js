import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreOrders: builder.query({
      query: () => '/orders/store',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetStoreOrdersQuery } = ordersApiSlice;
