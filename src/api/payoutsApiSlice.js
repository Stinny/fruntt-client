import { apiSlice } from './apiSlice';

export const payoutsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayouts: builder.query({
      query: () => `/payouts/get`,
      keepUnusedDataFor: 5,
    }),
    getBalance: builder.query({
      query: () => `/payouts/get/balance`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPayoutsQuery, useLazyGetBalanceQuery } = payoutsApiSlice;
