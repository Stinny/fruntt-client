import { apiSlice } from './apiSlice';

const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: ({ content, type, allowContact }) => ({
        url: '/feedback/add',
        method: 'POST',
        body: {
          content: content,
          type: type,
          allowContact: allowContact,
        },
      }),
    }),
    emailSignup: builder.mutation({
      query: ({ email }) => ({
        url: '/feedback/emailsignup',
        method: 'POST',
        body: {
          email: email,
        },
      }),
    }),
  }),
});

export const {
  useAddFeedbackMutation,
  useEmailSignupMutation,
} = feedbackApiSlice;
