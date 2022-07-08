import { apiSlice } from './apiSlice';

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCustomersQuery } = customersApiSlice;
