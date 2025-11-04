import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersStatistics: builder.query({
      query: () => ({
        url: `/stats/all-users`,
        method: "GET",
      }),
      providesTags: ["USER", "STATS"],
    }),
  }),
});

export const { useGetAllUsersStatisticsQuery } = statsApi;
