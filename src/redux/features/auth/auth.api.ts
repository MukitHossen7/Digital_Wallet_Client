import { baseApi } from "@/redux/baseApi";
import {
  IChangePassword,
  ILogin,
  IRegister,
  IRegisterData,
  IResponse,
  ISendOTP,
  IVerifyOTP,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<null>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    logOut: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    register: builder.mutation<IResponse<IRegisterData>, IRegister>({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),

    verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    changePassword: builder.mutation<IResponse<null>, IChangePassword>({
      query: (userData) => ({
        url: "/auth/change-password",
        method: "POST",
        data: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = authApi;
