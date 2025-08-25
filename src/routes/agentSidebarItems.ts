import { GoHomeFill } from "react-icons/go";
import { CiWallet } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { ISidebarItem } from "@/types";
import TransactionsPage from "@/pages/agent/TransactionsHistory";
import AgentOverview from "@/pages/agent/Overview";
import AgentWallet from "@/pages/agent/Wallet";
import AgentProfile from "@/pages/agent/MyProfile";
import { ListFilter } from "lucide-react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview,
        icon: GoHomeFill,
      },
      {
        title: "Wallet",
        url: "/agent/wallet",
        component: AgentWallet,
        icon: CiWallet,
      },
      {
        title: "Transaction",
        url: "/agent/transactions-history",
        component: TransactionsPage,
        icon: ListFilter,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: AgentProfile,
        icon: CgProfile,
      },
    ],
  },
];
