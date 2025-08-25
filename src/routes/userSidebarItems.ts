import { GoHomeFill } from "react-icons/go";
import { CiWallet } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ISidebarItem } from "@/types";
import Overview from "@/pages/user/Overview";
import TransactionHistory from "@/pages/user/TransactionHistory";
import MyProfile from "@/pages/user/MyProfile";
import WalletActionsPage from "@/pages/user/Wallet";

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
        component: WalletActionsPage,
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
        icon: AiOutlineTransaction,
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
