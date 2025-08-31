import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Clock,
  Headphones,
  PieChart,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FEATURES = [
  {
    id: "instant-transfer",
    title: "Instant Transfer",
    short: "Send & receive money instantly.",
    long: "Real-time transfers between NeoPay users and external accounts (agents/banks). Optimized routing ensures near-zero delay and instant confirmation.",
    icon: Zap,
    badge: "Core",
  },
  {
    id: "secure-transactions",
    title: "Secure Transactions",
    short: "Bank-grade encryption & monitoring.",
    long: "End-to-end encryption, JWT authentication, rate-limited endpoints, and automated fraud detection to protect your funds and data.",
    icon: ShieldCheck,
    badge: "Security",
  },
  {
    id: "agent-network",
    title: "Agent Network",
    short: "On-ground agents for cash-in/out.",
    long: "Large agent network for cash deposit & withdrawal with role-based controls for agents, commission tracking, and settlements.",
    icon: Users,
    badge: "Agent",
  },
  {
    id: "multi-platform",
    title: "Multi-Platform",
    short: "Mobile-first & responsive UI.",
    long: "Progressive web experience and native-like interactions on mobile, tablet, and desktop. Offline resilience and graceful error handling.",
    icon: Smartphone,
  },
  {
    id: "analytics",
    title: "Real-time Analytics",
    short: "Monitor transactions live.",
    long: "Admin dashboard with dynamic charts, transaction volume trends, and exportable reports for accounting & audits.",
    icon: PieChart,
  },
  {
    id: "support",
    title: "24/7 Support",
    short: "Always-on customer helpdesk.",
    long: "Round-the-clock support for users, agents, and admins via chat, email, and phone. Ensures quick issue resolution, dispute handling, and seamless wallet experience.",
    icon: Headphones,
  },
  {
    id: "smart-search",
    title: "Smart Search & Filters",
    short: "Find transactions, users, & agents fast.",
    long: "Powerful server-side filters, full-text search, and client-side quick filters to find records quickly even with large datasets.",
    icon: Search,
  },
  {
    id: "uptime",
    title: "High Availability",
    short: "Always-on wallet access.",
    long: "NeoPay ensures 24/7 uptime for all wallet services, allowing users and agents to send, receive, and manage money anytime without interruptions.",
    icon: Clock,
  },
];

const FeaturesStats = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="grid gap-6 lg:grid-cols-3 mb-12 items-start">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Key Capabilities</CardTitle>
            <CardDescription>
              Everything a modern digital wallet needs payments, agent
              operations, analytics, and admin tools.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {FEATURES?.slice(0, 6).map((f) => (
                  <motion.div
                    key={f.id}
                    className="p-4 rounded-xl border bg-card"
                    whileHover={{ scale: 1.02 }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-4">
                      <f.icon className="w-8 h-8 text-primary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{f.title}</h4>
                          {f.badge && (
                            <Badge variant="secondary">{f.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {f.short}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Quick actions to explore NeoPay</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <div className="mt-3 text-sm text-muted-foreground">
              <strong>New to NeoPay?</strong> Try our demo wallet to explore
              secure transactions and features.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesStats;
