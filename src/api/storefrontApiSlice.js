import { apiSlice } from './apiSlice';

export const storefrontApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorefront: builder.query({
      query: ({ storeId }) => `/storefront/store/${storeId}`,
    }),
    getFeaturedStores: builder.query({
      query: () => `/storefront/featured`,
    }),
    getStorefrontByID: builder.query({
      query: ({ storeId }) => `/storefront/get/${storeId}`,
    }),
    getStorefrontByURL: builder.query({
      query: ({ storeUrl }) => `/storefront/s/${storeUrl}`,
    }),
    getStoreStats: builder.query({
      query: ({ storeId, view }) => `/storefront/storestats/${storeId}/${view}`,
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
    hideSections: builder.mutation({
      query: ({ storeId, hideDescription, hideReviews, hideQuestions }) => ({
        url: `/storefront/hidesections`,
        method: 'POST',
        body: {
          storeId: storeId,
          hideReviews: hideReviews,
          hideQuestions: hideQuestions,
          hideDescription: hideDescription,
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
    updatePage: builder.mutation({
      query: ({ storeId, pageName, filtering, sales }) => ({
        url: `/storefront/update/${storeId}`,
        method: 'POST',
        body: {
          pageName: pageName,
          filtering: filtering,
          sales: sales,
        },
      }),
    }),
    checkPage: builder.mutation({
      query: ({ pageName }) => ({
        url: `/storefront/checkname`,
        method: 'POST',
        body: {
          pageName: pageName,
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
        cardBG,
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
        price,
        reviewBackground,
        faqBackground,
      }) => ({
        url: `/storefront/edit/${storeId}`,
        method: 'POST',
        body: {
          cardBG: cardBG,
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
          price: price,
          reviewBackground: reviewBackground,
          faqBackground: faqBackground,
        },
      }),
    }),
  }),
});

export const {
  useGetStorefrontQuery,
  useGetFeaturedStoresQuery,
  useEditStylesMutation,
  useUpdatePageMutation,
  useDeleteLogoMutation,
  useAddSocialsMutation,
  useGetStoreStatsQuery,
  useAddStoreMutation,
  useLazyGetStorefrontByIDQuery,
  useDeleteStoreMutation,
  useHideSectionsMutation,
  useGetStorefrontByURLQuery,
  useCheckPageMutation,
} = storefrontApiSlice;
