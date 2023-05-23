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
    twitterLogin: builder.mutation({
      query: ({ oauthToken, oauthSecret, oauthVerifier }) => ({
        url: '/auth/twitter/login',
        method: 'POST',
        body: {
          oauthToken: oauthToken,
          oauthSecret: oauthSecret,
          oauthVerifier: oauthVerifier,
        },
      }),
    }),
    twitterRegister: builder.mutation({
      query: ({ oauthToken, oauthSecret, oauthVerifier, storeName }) => ({
        url: '/auth/twitter/register',
        method: 'POST',
        body: {
          oauthToken: oauthToken,
          oauthSecret: oauthSecret,
          oauthVerifier: oauthVerifier,
          storeName: storeName,
        },
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/auth/deleteaccount',
        method: 'POST',
      }),
    }),
    getOnboardUrl: builder.query({
      query: () => '/auth/onboard',
    }),
    getTwitterAuthUrl: builder.query({
      query: ({ type }) => `/auth/twitter/${type}`,
    }),
    getSetupIntent: builder.query({
      query: () => '/auth/getsetupintent',
    }),
    getUpdatedUser: builder.query({
      query: () => '/auth/updateduser',
    }),
    disconnectStripe: builder.mutation({
      query: () => ({
        url: '/auth/disconnectstripe',
        method: 'POST',
      }),
    }),
    addPaymentMethod: builder.mutation({
      query: ({ paymentMethodId }) => ({
        url: '/auth/addpayment',
        method: 'POST',
        body: {
          paymentMethodId: paymentMethodId,
        },
      }),
    }),
    deletePaymentMethod: builder.mutation({
      query: () => ({
        url: '/auth/deletepayment',
        method: 'POST',
      }),
    }),
    updateAccountInfo: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/updateaccountinfo',
        method: 'POST',
        body: {
          email: email,
        },
      }),
    }),
    updateSellerProfile: builder.mutation({
      query: ({
        firstName,
        lastName,
        bio,
        facebook,
        youtube,
        twitter,
        instagram,
        tiktok,
        profilePicUrl,
        profilePicKey,
        linkedin,
      }) => ({
        url: '/auth/updatesellerprofile',
        method: 'POST',
        body: {
          firstName: firstName,
          lastName: lastName,
          bio: bio,
          facebook: facebook,
          youtube: youtube,
          twitter: twitter,
          instagram: instagram,
          tiktok: tiktok,
          linkedin: linkedin,
          profilePicUrl: profilePicUrl,
          profilePicKey: profilePicKey,
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
    sendResetEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/sendresetemail',
        method: 'POST',
        body: {
          email: email,
        },
      }),
    }),
    checkToken: builder.mutation({
      query: ({ token }) => ({
        url: '/auth/checkresettoken',
        method: 'POST',
        body: {
          token: token,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/resetpassword',
        method: 'POST',
        body: {
          password: password,
          email: email,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetOnboardUrlQuery,
  useGetUpdatedUserQuery,
  useLazyGetUpdatedUserQuery,
  useDisconnectStripeMutation,
  useUpdateAccountInfoMutation,
  useUpdateBusinessInfoMutation,
  useUpdateNotificationsMutation,
  useConfirmEmailMutation,
  useLazyGetSetupIntentQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useUpdateSellerProfileMutation,
  useDeleteAccountMutation,
  useSendResetEmailMutation,
  useCheckTokenMutation,
  useResetPasswordMutation,
  useLazyGetTwitterAuthUrlQuery,
  useTwitterLoginMutation,
  useTwitterRegisterMutation,
} = authApiSlice;
