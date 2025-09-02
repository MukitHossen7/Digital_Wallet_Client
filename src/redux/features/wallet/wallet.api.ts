import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeWallet: builder.query({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
  }),
});

export const { useGetMeWalletQuery } = walletApi;
