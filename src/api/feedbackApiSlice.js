import { apiSlice } from './apiSlice';

const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: ({ content, type }) => ({
        url: '/feedback/add',
        method: 'POST',
        body: {
          content: content,
          type: type,
        },
      }),
    }),
  }),
});

export const { useAddFeedbackMutation } = feedbackApiSlice;
