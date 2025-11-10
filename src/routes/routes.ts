import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UnAuthorized from "@/pages/UnAuthorized";
import Verify from "@/pages/Verify";
import { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import ResetPassword from "@/pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "feature",
        Component: Features,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: "/admin/overview",
          replace: true,
        }),
      },
      ...generateRoutes(adminSidebarItems),
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.USER as TRole),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: "/user/overview",
          replace: true,
        }),
      },
      ...generateRoutes(userSidebarItems),
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: "/agent/overview",
          replace: true,
        }),
      },
      ...generateRoutes(agentSidebarItems),
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: UnAuthorized,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
