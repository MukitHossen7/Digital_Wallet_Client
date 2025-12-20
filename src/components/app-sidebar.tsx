import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getSidebarItems } from "@/utils/getSidebarItems";
import {
  authApi,
  useGetMeQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";

import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { Logo } from "./layout/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const location = useLocation();
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sidebarData = getSidebarItems(userData?.data?.role);

  const handleLogOut = async () => {
    const toastId: string | number | undefined =
      toast.loading("Logging out...");
    try {
      const result = await logOut(null).unwrap();
      if (result.success) {
        toast.success("Logged out successfully", { id: toastId });
        dispatch(authApi.util.resetApiState());
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Logout failed", { id: toastId });
    }
  };

  return (
    <Sidebar
      {...props}
      collapsible="icon"
      className="border-r border-border/40 bg-sidebar/50 backdrop-blur-xl"
    >
      <SidebarHeader className="h-20 flex items-start justify-center border-b border-border/40 px-4">
        <Link
          to="/"
          className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
        >
          <div className="flex items-center justify-center">
            <Logo className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <p className="text-xl font-extrabold tracking-tight">
              Neo<span className="text-primary">Pay</span>
            </p>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Digital Wallet
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.map((group) => (
          <SidebarGroup key={group.title} className="px-3">
            <SidebarGroupLabel className="px-4 mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={`h-10 rounded-md transition-all duration-300 px-4 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                            : "hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          {item.icon && (
                            <item.icon
                              className={`h-5 w-5 transition-transform duration-300 ${
                                isActive ? "scale-110" : "text-muted-foreground"
                              }`}
                            />
                          )}
                          <span className="font-bold text-sm tracking-tight">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 bg-muted/20">
        <div className="flex flex-col gap-3">
          {/* User Profile Mini-Card */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-background/50 border border-border/50 group-data-[collapsible=icon]:hidden">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate tracking-tight">
                {userData?.data?.name || "Premium User"}
              </span>
              <span className="text-[10px] font-bold text-secondary-foreground bg-secondary px-1.5 rounded-sm self-start uppercase">
                {userData?.data?.role}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground font-bold transition-all active:scale-95 group-data-[collapsible=icon]:justify-center"
            onClick={handleLogOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
