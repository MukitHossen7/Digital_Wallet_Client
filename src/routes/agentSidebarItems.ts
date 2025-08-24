import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/agent/AddMoney"));
const MyProfile = lazy(() => import("@/pages/agent/MyProfile"));
const Overview = lazy(() => import("@/pages/agent/Overview"));
const TransactionsHistory = lazy(
  () => import("@/pages/agent/TransactionsHistory")
);
const WithdrawMoney = lazy(() => import("@/pages/agent/WithdrawMoney"));

export const agentSidebarItems = [
  {
    title: "Agent Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: Overview,
      },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/agent/withdraw",
        component: WithdrawMoney,
      },

      {
        title: "History",
        url: "/agent/transactions-history",
        component: TransactionsHistory,
      },
      {
        title: "My Profile",
        url: "/agent/profile",
        component: MyProfile,
      },
    ],
  },
];
