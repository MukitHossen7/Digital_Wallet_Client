import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data: userInfo, isLoading } = useGetMeQuery(undefined);
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }

    if (!userInfo?.data?.email && !isLoading) {
      return <Navigate to="/login" />;
    }

    if (!isLoading && requiredRole && requiredRole !== userInfo?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
