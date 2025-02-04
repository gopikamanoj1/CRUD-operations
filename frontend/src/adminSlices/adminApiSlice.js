import { adminSlice } from "./apiSlice";

const USERS_URL = '/api/admin';

export const adminApiSlice = adminSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/adminlogin`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = adminApiSlice;