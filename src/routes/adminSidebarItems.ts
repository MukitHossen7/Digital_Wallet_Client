import { GoHomeFill } from "react-icons/go";
import { ListFilter, UserCheck, Users } from "lucide-react";
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
        title: "Users",
        url: "/admin/manage-users",
        component: ManageUsers,
        icon: Users,
      },
      {
        title: "Agents",
        url: "/admin/manage-agents",
        component: ManageAgents,
        icon: UserCheck,
      },
      {
        title: "Transaction",
        url: "/admin/all-transactions",
        component: AllTransaction,
        icon: ListFilter,
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
