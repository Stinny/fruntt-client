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
    updateAccountInfo: builder.mutation({
      query: ({ firstName, lastName, email }) => ({
        url: '/auth/updateaccountinfo',
        method: 'POST',
        body: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      }),
    }),
    updateBusinessInfo: builder.mutation({
      query: ({ name, address, country, state, city, zip }) => ({
        url: '/auth/updatebusinessinfo',
        method: 'POST',
        body: {
          name: name,
          address: address,
          country: country,
          state: state,
          city: city,
          zip: zip,
        },
      }),
    }),
    updateNotifications: builder.mutation({
      query: ({
        sendUpdates,
        sendItemOutOfStock,
        sendOrderPlaced,
        sendReviewCollected,
      }) => ({
        url: '/auth/updatenotifications',
        method: 'POST',
        body: {
          sendUpdates: sendUpdates,
          sendItemOutOfStock: sendItemOutOfStock,
          sendOrderPlaced: sendOrderPlaced,
          sendReviewCollected: sendReviewCollected,
        },
      }),
    }),
    confirmEmail: builder.mutation({
      query: () => ({
        url: '/auth/confirmemail',
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
  useUpdateAccountInfoMutation,
  useUpdateBusinessInfoMutation,
  useUpdateNotificationsMutation,
  useConfirmEmailMutation,
} = authApiSlice;
