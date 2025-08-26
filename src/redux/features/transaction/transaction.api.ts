import { baseApi } from "@/redux/baseApi";
import { IAddMoney, IResponse, ISendMoney, IWithdrawMoney } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation<IResponse<null>, IAddMoney>({
      query: (transactionData) => ({
        url: "/transactions/add-money",
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    withdrawMoney: builder.mutation<IResponse<null>, IWithdrawMoney>({
      query: (transactionData) => ({
        url: "/transactions/withdraw",
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    sendMoney: builder.mutation<IResponse<null>, ISendMoney>({
      query: (transactionData) => ({
        url: "/transactions/send-money",
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
} = transactionApi;
