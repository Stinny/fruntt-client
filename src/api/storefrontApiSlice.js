import { apiSlice } from './apiSlice';

export const storefrontApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorefront: builder.query({
      query: () => '/storefront',
    }),
    editStyles: builder.mutation({
      query: ({
        storeId,
        navbarBG,
        pageBG,
        pageText,
        buttonBG,
        buttonTextColor,
        footerBG,
      }) => ({
        url: `/storefront/edit/${storeId}`,
        method: 'POST',
        body: {
          navbarBG: navbarBG,
          pageBG: pageBG,
          pageText: pageText,
          buttonBG: buttonBG,
          buttonTextColor: buttonTextColor,
          footerBG: footerBG,
        },
      }),
    }),
  }),
});

export const {
  useGetStorefrontQuery,
  useEditStylesMutation,
} = storefrontApiSlice;
