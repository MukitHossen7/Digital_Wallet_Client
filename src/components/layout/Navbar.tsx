import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdLogIn } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { role } from "@/constants/role";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { ModeToggle } from "./ModeToggler";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/feature", label: "Features", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/user", label: "Dashboard", role: role.USER },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
];

export default function Navbar() {
  const { data: userData } = useGetMeQuery(undefined);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="flex h-16 items-center justify-between gap-2 md:gap-4">
          {/* Left side: Logo & Navigation */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-8">
            {/* Mobile menu trigger - Hidden on MD and Up */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-9 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 group-aria-expanded:opacity-0"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-2 md:hidden">
                <nav className="flex flex-col gap-1">
                  {navigationLinks
                    .filter((link) => {
                      if (link.role === "PUBLIC") return true;
                      return userData?.data?.role === link.role;
                    })
                    .map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          location.pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                </nav>
              </PopoverContent>
            </Popover>

            {/* Brand Logo - Responsive sizes */}
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 shrink-0"
            >
              <Logo className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />

              <div className="flex flex-col leading-none">
                <p className="text-lg sm:text-xl font-bold tracking-tight uppercase">
                  Neo<span className="text-primary">Pay</span>
                </p>
                <span className="hidden sm:block text-[8px] lg:text-[10px] font-medium text-muted-foreground tracking-[0.1em] lg:tracking-[0.2em] uppercase">
                  Digital Wallet
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Visible from MD */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-0.5 lg:gap-1">
                {navigationLinks
                  .filter((link) => {
                    if (link.role === "PUBLIC") return true;
                    return userData?.data?.role === link.role;
                  })
                  .map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={cn(
                            "px-2 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-colors hover:text-primary",
                            location.pathname === link.href
                              ? "text-primary border-b-2 border-primary rounded-none"
                              : "text-muted-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Actions - Responsive spacing */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ModeToggle />

            {!userData?.data?.email ? (
              <Button
                asChild
                size="sm"
                className="h-8 lg:h-10 px-3 lg:px-4 font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95 text-xs lg:text-sm"
              >
                <Link to="/login" className="flex items-center gap-1 sm:gap-2">
                  <IoMdLogIn className="text-base" />
                  <span>Sign In</span>
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                asChild
                size="sm"
                className="hidden xs:flex h-8 sm:h-9 border-primary/50 hover:bg-primary/5 text-primary text-xs sm:text-sm"
              >
                <Link to={`/${userData?.data?.role.toLowerCase()}`}>
                  Dashboard
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
