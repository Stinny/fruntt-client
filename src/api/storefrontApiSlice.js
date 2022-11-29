import { apiSlice } from './apiSlice';

export const storefrontApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorefront: builder.query({
      query: ({ storeId }) => `/storefront/store/${storeId}`,
    }),
    getStorefrontByID: builder.query({
      query: ({ storeId }) => `/storefront/get/${storeId}`,
    }),
    getStoreStats: builder.query({
      query: ({ storeId }) => `/storefront/storestats/${storeId}`,
    }),
    addStore: builder.mutation({
      query: ({ pageName }) => ({
        url: `/storefront/addpage`,
        method: 'POST',
        body: {
          pageName: pageName,
        },
      }),
    }),
    deleteStore: builder.mutation({
      query: ({ storeId }) => ({
        url: `/storefront/delete`,
        method: 'POST',
        body: {
          storeId: storeId,
        },
      }),
    }),
    addSocials: builder.mutation({
      query: ({ storeId, youtube, facebook, instagram, twitter }) => ({
        url: `/storefront/addsocials`,
        method: 'POST',
        body: {
          storeId: storeId,
          facebook: facebook,
          youtube: youtube,
          twitter: twitter,
          instagram: instagram,
        },
      }),
    }),
    addLogo: builder.mutation({
      query: ({ storeId, logoUrl, logoKey, name }) => ({
        url: `/storefront/addlogo/${storeId}`,
        method: 'POST',
        body: {
          logoUrl: logoUrl,
          logoKey: logoKey,
          name: name,
        },
      }),
    }),
    deleteLogo: builder.mutation({
      query: ({ storeId, key }) => ({
        url: `/storefront/deletelogo`,
        method: 'POST',
        body: {
          storeId: storeId,
          key: key,
        },
      }),
    }),
    editStyles: builder.mutation({
      query: ({
        storeId,
        navbarBG,
        pageBG,
        pageText,
        buttonColor,
        buttonTextColor,
        footerBG,
        buttonStyle,
        socialIcons,
        hideNav,
        hideFooter,
        borders,
        header,
        reviewBackground,
        faqBackground,
      }) => ({
        url: `/storefront/edit/${storeId}`,
        method: 'POST',
        body: {
          navbarBG: navbarBG,
          pageBG: pageBG,
          pageText: pageText,
          buttonColor: buttonColor,
          buttonTextColor: buttonTextColor,
          footerBG: footerBG,
          buttonStyle: buttonStyle,
          socialIcons: socialIcons,
          hideNav: hideNav,
          hideFooter: hideFooter,
          borders: borders,
          header: header,
          reviewBackground: reviewBackground,
          faqBackground: faqBackground,
        },
      }),
    }),
  }),
});

export const {
  useGetStorefrontQuery,
  useEditStylesMutation,
  useAddLogoMutation,
  useDeleteLogoMutation,
  useAddSocialsMutation,
  useGetStoreStatsQuery,
  useAddStoreMutation,
  useLazyGetStorefrontByIDQuery,
  useDeleteStoreMutation,
} = storefrontApiSlice;
