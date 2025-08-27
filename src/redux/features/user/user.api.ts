import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAndAgent: builder.query({
      query: ({ user }) => ({
        url: `/users?role=${user}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserAndAgentQuery } = userApi;
