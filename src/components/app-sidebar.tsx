/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { getSidebarItems } from "@/utils/getSidebarItems";
import {
  authApi,
  useGetMeQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";
import Logo from "../assets/images/logo (1).png";
import { Button } from "./ui/button";
import { BiLogOutCircle } from "react-icons/bi";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Logged out, please wait...");
      const result = await logOut(null).unwrap();
      if (result.success) {
        toast.success("Logged out successfully", { id: toastId });
        dispatch(authApi.util.resetApiState());
        navigate("/");
      }
    } catch (error: any) {
      if (toastId) {
        toast.error(error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      } else {
        toast.error("Logout failed");
      }
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex flex-col h-full">
      <Sidebar {...props} className="flex flex-col h-full">
        <SidebarHeader>
          <div className="flex items-center">
            <img className="w-6 md:w-8 h-6 md:h-8" src={Logo} />
            <Link className="text-lg md:text-xl font-bold uppercase" to="/">
              NeoPay
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="text-base">
                {item.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="" asChild>
                        <Link
                          to={item.url}
                          className="flex items-center gap-2  font-medium"
                        >
                          {"icon" in item && item.icon && <item.icon />}

                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <div className="p-4 border-t border-gray-200 dark:border-gray-900">
          <Button
            className="text-sm w-full"
            variant="outline"
            onClick={handleLogOut}
          >
            <BiLogOutCircle />
            LogOut
          </Button>
        </div>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
