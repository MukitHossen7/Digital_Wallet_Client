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

    approveAgent: builder.mutation<IResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/users/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    suspendAgent: builder.mutation<IResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/users/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    updateUserProfile: builder.mutation<IResponse<null>, FormData>({
      query: (updateData) => ({
        url: "/users/updateProfile",
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUserAndAgentQuery,
  useHandleBlockMutation,
  useUnBlockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useUpdateUserProfileMutation,
} = userApi;
