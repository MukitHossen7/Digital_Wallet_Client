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
import { Link } from "react-router";
import logo from "../../assets/images/logo (1).png";
import { role } from "@/constants/role";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { ModeToggle } from "./ModeToggler";

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

  return (
    <header className="sticky top-0 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl z-50 border-b">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto ">
        <div className="flex h-16 items-center justify-between gap-4 ">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
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
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link?.href as string}>{link?.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link to="/">
                <div className="flex items-center">
                  <img className="w-8 h-8" src={logo} />
                  <p className="text-xl font-bold uppercase">NeoPay</p>
                </div>
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
            <ModeToggle />
            {!userData?.data?.email && (
              <Button asChild className="text-sm">
                <Link to="/login">
                  <IoMdLogIn />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
