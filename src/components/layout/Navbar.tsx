/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link, useNavigate } from "react-router";

import { role } from "@/constants/role";
import Logo from "@/assets/icons/Logo";
import {
  authApi,
  useGetMeQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/feature", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/user", label: "Dashboard", role: role.USER },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
];

export default function Navbar() {
  const { data: userData } = useGetMeQuery(undefined);
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
    <header className="border-b w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <div className="flex h-16 items-center justify-between gap-4 ">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Sheet>
            {/* Hamburger button */}
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>

            {/* Mobile menu drawer */}
            <SheetContent side="left" className="p-6">
              <div className="flex flex-col gap-3">
                {navigationLinks
                  .filter((link) => {
                    if (link.role === "PUBLIC") return true;
                    if (
                      userData?.data?.role &&
                      link.role === userData.data.role
                    ) {
                      return true;
                    }
                  })
                  .map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="w-8 h-9">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks
                  .filter((link) => {
                    if (link.role === "PUBLIC") return true;
                    if (
                      userData?.data?.role &&
                      link.role === userData?.data?.role
                    ) {
                      return true;
                    }
                  })
                  .map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        <Link to={link?.href as string}> {link?.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {userData?.data?.email ? (
            <Button
              className="text-sm"
              variant="outline"
              onClick={handleLogOut}
            >
              LogOut
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
