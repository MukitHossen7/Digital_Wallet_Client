import AllTransaction from "@/pages/admin/AllTransaction";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import MyProfile from "@/pages/admin/MyProfile";
import Overview from "@/pages/admin/Overview";

export const adminSidebarItems = [
  {
    title: "Admin Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
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
        title: "All Transactions",
        url: "/admin/all-transactions",
        component: AllTransaction,
      },
      {
        title: "My Profile",
        url: "/admin/profile",
        component: MyProfile,
      },
    ],
  },
];
