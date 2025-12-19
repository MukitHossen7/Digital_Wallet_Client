import {
  Clock,
  Headphones,
  PieChart,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "instant-transfer",
    title: "Instant Transfer",
    short: "Send & receive money instantly.",
    long: "Real-time transfers between NeoPay users and external accounts (agents/banks). Optimized routing ensures near-zero delay and instant confirmation.",
    icon: Zap,
    badge: "Core",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "secure-transactions",
    title: "Secure Transactions",
    short: "Bank-grade encryption & monitoring.",
    long: "End-to-end encryption, JWT authentication, rate-limited endpoints, and automated fraud detection to protect your funds and data.",
    icon: ShieldCheck,
    badge: "Security",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "agent-network",
    title: "Agent Network",
    short: "On-ground agents for cash-in/out.",
    long: "Large agent network for cash deposit & withdrawal with role-based controls for agents, commission tracking, and settlements.",
    icon: Users,
    badge: "Agent",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "multi-platform",
    title: "Multi-Platform",
    short: "Mobile-first & responsive UI.",
    long: "Progressive web experience and native-like interactions on mobile, tablet, and desktop. Offline resilience and graceful error handling.",
    icon: Smartphone,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "analytics",
    title: "Real-time Analytics",
    short: "Monitor transactions live.",
    long: "Admin dashboard with dynamic charts, transaction volume trends, and exportable reports for accounting & audits.",
    icon: PieChart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    id: "support",
    title: "24/7 Support",
    short: "Always-on customer helpdesk.",
    long: "Round-the-clock support for users, agents, and admins via chat, email, and phone. Ensures quick issue resolution and seamless wallet experience.",
    icon: Headphones,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "smart-search",
    title: "Smart Search & Filters",
    short: "Find records fast.",
    long: "Powerful server-side filters, full-text search, and client-side quick filters to find records quickly even with large datasets.",
    icon: Search,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "uptime",
    title: "High Availability",
    short: "Always-on wallet access.",
    long: "NeoPay ensures 24/7 uptime for all wallet services, allowing users and agents to manage money anytime without interruptions.",
    icon: Clock,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const FeaturesPanel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="mb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {FEATURES.map((f) => (
          <motion.div key={f.id} variants={itemVariants} className="h-full">
            <Card className="group relative h-full flex flex-col p-6 bg-card hover:bg-card/50 border-primary/5 hover:border-primary/30 shadow-none hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
              {/* Decorative Corner Background */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                    f.bgColor
                  )}
                >
                  <f.icon className={cn("w-6 h-6", f.color)} />
                </div>
                {f.badge && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-none font-bold uppercase text-[10px]"
                  >
                    {f.badge}
                  </Badge>
                )}
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm font-semibold text-foreground/80 leading-snug">
                  {f.short}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {f.long}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-bold tracking-tighter opacity-70"
                >
                  Stable v2.0
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 -mr-2 group/btn"
                >
                  Learn more
                  <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesPanel;
