import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAndAgent: builder.query({
      query: ({ user }) => ({
        url: `/users?role=${user}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    handleBlock: builder.mutation<IResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    unBlockUser: builder.mutation<IResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/users/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUserAndAgentQuery,
  useHandleBlockMutation,
  useUnBlockUserMutation,
} = userApi;
