import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    getOnboardUrl: builder.query({
      query: () => '/auth/onboard',
    }),
    getUpdatedUser: builder.query({
      query: () => '/auth/updateduser',
      keepUnusedDataFor: 5,
    }),
    disconnectStripe: builder.mutation({
      query: () => ({
        url: '/auth/disconnectstripe',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetOnboardUrlQuery,
  useGetUpdatedUserQuery,
  useDisconnectStripeMutation,
} = authApiSlice;
