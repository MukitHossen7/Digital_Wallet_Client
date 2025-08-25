import { GoHomeFill } from "react-icons/go";
import { CiWallet } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { ISidebarItem } from "@/types";
import Overview from "@/pages/user/Overview";
import TransactionHistory from "@/pages/user/TransactionHistory";
import MyProfile from "@/pages/user/MyProfile";
import WalletPage from "@/pages/user/Wallet";
import { ListFilter } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: Overview,
        icon: GoHomeFill,
      },
      {
        title: "Wallet",
        url: "/user/wallet",
        component: WalletPage,
        icon: CiWallet,
      },
      // {
      //   title: "Withdraw Money",
      //   url: "/user/withdraw",
      //   component: WithdrawMoney,
      // },
      // {
      //   title: "Send Money",
      //   url: "/user/send-money",
      //   component: SendMoney,
      // },
      {
        title: "Transaction",
        url: "/user/transactions-history",
        component: TransactionHistory,
        icon: ListFilter,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: MyProfile,
        icon: CgProfile,
      },
    ],
  },
];
