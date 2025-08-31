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
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const FeaturesPanel = () => {
  return (
    <section className="grid lg:grid-cols-3 mb-12">
      <div className="lg:col-span-3">
        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {f.short}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground grow">
                  <p className="truncate-lines-3">{f.long}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">stable</Badge>
                  </div>
                  <Button size="sm" variant="ghost">
                    Learn more
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPanel;
