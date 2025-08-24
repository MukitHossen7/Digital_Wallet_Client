import { lazy } from "react";
const DepositMoney = lazy(() => import("@/pages/user/DepositMoney"));
const MyProfile = lazy(() => import("@/pages/user/MyProfile"));
const Overview = lazy(() => import("@/pages/user/Overview"));
const SendMoney = lazy(() => import("@/pages/user/SendMoney"));
const TransactionHistory = lazy(
  () => import("@/pages/user/TransactionHistory")
);
const WithdrawMoney = lazy(() => import("@/pages/user/WithdrawMoney"));

export const userSidebarItems = [
  {
    title: "User Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: Overview,
      },
      {
        title: "Deposit Money",
        url: "/user/deposit",
        component: DepositMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw",
        component: WithdrawMoney,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "History",
        url: "/user/transactions-history",
        component: TransactionHistory,
      },
      {
        title: "My Profile",
        url: "/user/profile",
        component: MyProfile,
      },
    ],
  },
];
