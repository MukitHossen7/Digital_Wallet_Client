import { lazy } from "react";
const AllTransaction = lazy(() => import("@/pages/admin/AllTransaction"));
const ManageAgents = lazy(() => import("@/pages/admin/ManageAgents"));
const ManageUsers = lazy(() => import("@/pages/admin/ManageUsers"));
const MyProfile = lazy(() => import("@/pages/admin/MyProfile"));
const Overview = lazy(() => import("@/pages/admin/Overview"));

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
