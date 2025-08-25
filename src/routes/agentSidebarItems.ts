import { GoHomeFill } from "react-icons/go";
import { CiWallet } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import MyProfile from "@/pages/agent/MyProfile";
import Overview from "@/pages/agent/Overview";
import TransactionsHistory from "@/pages/agent/TransactionsHistory";
import { ISidebarItem } from "@/types";
import AgentCashInOutPage from "@/pages/agent/AddMoney";
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: Overview,
        icon: GoHomeFill,
      },
      {
        title: "Wallet",
        url: "/agent/add-money",
        component: AgentCashInOutPage,
        icon: CiWallet,
      },
      // {
      //   title: "Withdraw Money",
      //   url: "/agent/withdraw",
      //   component: WithdrawMoney,
      // },

      {
        title: "Transaction",
        url: "/agent/transactions-history",
        component: TransactionsHistory,
        icon: AiOutlineTransaction,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: MyProfile,
        icon: CgProfile,
      },
    ],
  },
];
