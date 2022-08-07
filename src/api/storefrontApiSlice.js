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
        itemDetailsBG,
        itemText,
        buttonBG,
        buttonTextColor,
        footerBG,
      }) => ({
        url: `/storefront/edit/${storeId}`,
        method: 'POST',
        body: {
          navbarBG: navbarBG,
          pageBG: pageBG,
          itemDetailsBG: itemDetailsBG,
          itemText: itemText,
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
