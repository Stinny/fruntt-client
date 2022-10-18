import { apiSlice } from './apiSlice';

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => '/customers',
      keepUnusedDataFor: 5,
    }),
    getCustomer: builder.query({
      query: ({ customerId }) => `/customers/singlecustomer/${customerId}`,
      keepUnusedDataFor: 5,
    }),
    sendReviewEmail: builder.mutation({
      query: ({ customerId, storeId }) => ({
        url: '/customers/sendreviewemail',
        method: 'POST',
        body: {
          customerId: customerId,
          storeId: storeId,
        },
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useSendReviewEmailMutation,
  useGetCustomerQuery,
} = customersApiSlice;
