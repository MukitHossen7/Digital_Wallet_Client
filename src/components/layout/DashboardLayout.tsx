// import { AppSidebar } from "@/components/app-sidebar";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Outlet } from "react-router";
// export default function DashboardLayout() {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator
//             orientation="vertical"
//             className="mr-2 data-[orientation=vertical]:h-4"
//           />
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <Outlet />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background/95">
        {/* Modern Glass Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-background/60 px-6 backdrop-blur-xl transition-all">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 hover:bg-primary/10 transition-colors" />
            <Separator orientation="vertical" className="h-5 bg-border/60" />

            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-tight">
                Main Dashboard
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                Welcome back, manage your finances securely.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dynamic Balance or Info Badge like Nagad/bKash */}
            <div className="hidden md:flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-secondary/20">
              <div className="h-2 w-2 rounded-full bg-secondary-foreground animate-pulse" />
              <span className="text-xs font-bold text-secondary-foreground uppercase tracking-wider">
                System Active
              </span>
            </div>

            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 p-[1px]">
              <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                <span className="text-xs font-black text-primary italic">
                  NP
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
