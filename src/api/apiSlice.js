import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const aToken = Cookies.get('aToken') ? Cookies.get('aToken') : null;

    if (aToken) {
      headers.set('Authorization', `Bearer ${aToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');

    const rToken = Cookies.get('rToken');

    const refreshResult = await baseQuery(
      `/auth/refresh/${rToken}`,
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      Cookies.set('aToken', refreshResult.data, { sameSite: 'Lax' });

      result = await baseQuery(args, api, extraOptions);
    } else {
      //do something like logout function
      console.log('Tried getting new access token but failed');
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
