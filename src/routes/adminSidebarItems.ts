import { GoHomeFill } from "react-icons/go";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import AllTransaction from "@/pages/admin/AllTransaction";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import MyProfile from "@/pages/admin/MyProfile";
import Overview from "@/pages/admin/Overview";
import { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
        icon: GoHomeFill,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        title: "Manage Agents",
        url: "/admin/manage-agents",
        component: ManageAgents,
      },
      {
        title: "Transaction",
        url: "/admin/all-transactions",
        component: AllTransaction,
        icon: AiOutlineTransaction,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: MyProfile,
        icon: CgProfile,
      },
    ],
  },
];
