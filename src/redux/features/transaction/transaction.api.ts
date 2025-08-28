import { baseApi } from "@/redux/baseApi";
import {
  IAddMoney,
  ICashIn,
  ICashOut,
  IResponse,
  ISendMoney,
  IWithdrawMoney,
} from "@/types";

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

    agentCashIn: builder.mutation<IResponse<null>, ICashIn>({
      query: (transactionData) => ({
        url: "/transactions/cash-in",
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    agentCashOut: builder.mutation<IResponse<null>, ICashOut>({
      query: (transactionData) => ({
        url: "/transactions/cash-out",
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    getMeTransaction: builder.query({
      query: ({ page, limit, type, fromDate, toDate }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (type) params.append("type", type);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);
        return {
          url: `/transactions/me?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),

    getALLTransaction: builder.query({
      query: ({ page, limit, type }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (type) params.append("type", type);
        return {
          url: `/transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    getTransactionSummery: builder.query({
      query: () => ({
        url: "/transactions/summary",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

    getAllTransactionVolume: builder.query({
      query: () => ({
        url: "/transactions/volume",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useGetMeTransactionQuery,
  useAgentCashInMutation,
  useAgentCashOutMutation,
  useGetTransactionSummeryQuery,
  useGetALLTransactionQuery,
  useGetAllTransactionVolumeQuery,
} = transactionApi;
