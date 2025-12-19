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
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import {
  Clock,
  PieChart,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "instant-transfer",
    title: "Instant Transfer",
    short: "Send & receive money instantly.",
    icon: Zap,
    badge: "Core",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "secure-transactions",
    title: "Secure Transactions",
    short: "Bank-grade encryption.",
    icon: ShieldCheck,
    badge: "Security",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "agent-network",
    title: "Agent Network",
    short: "On-ground agents support.",
    icon: Users,
    badge: "Agent",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "multi-platform",
    title: "Multi-Platform",
    short: "Mobile-first & responsive UI.",
    icon: Smartphone,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "analytics",
    title: "Real-time Analytics",
    short: "Monitor transactions live.",
    icon: PieChart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    id: "smart-search",
    title: "Smart Search",
    short: "Find records fast & easy.",
    icon: Search,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const FeaturesStats = () => {
  const [loading, setLoading] = useState(true);
  const { data: userData } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="grid gap-6 lg:grid-cols-12 mb-16 items-stretch">
      {/* --- Left Column: Capabilities Grid --- */}
      <div className="lg:col-span-8 h-full">
        <Card className="h-full border-primary/10 shadow-none border-none overflow-hidden flex flex-col">
          <CardHeader className="pb-8">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Key Capabilities
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  Everything a modern digital wallet needs to thrive.
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="border-primary/30 text-primary"
              >
                v2.0 Stable
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {FEATURES.map((f) => (
                  <motion.div
                    key={f.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative p-5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
                          f.bgColor
                        )}
                      >
                        <f.icon className={cn("w-6 h-6", f.color)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground">
                            {f.title}
                          </h4>
                          {f.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">
                              {f.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {f.short}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- Right Column: CTA & Engagement --- */}
      <div className="lg:col-span-4 flex flex-col gap-6 h-full">
        {/* Registration CTA Card */}
        <Card className="relative overflow-hidden border-primary/20 bg-primary/[0.02] flex flex-col shadow-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <CardHeader>
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>Join the NeoPay ecosystem today.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 flex-grow">
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                disabled={userData?.data?.email}
                className="w-full h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all rounded-lg"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border/50 text-sm leading-relaxed">
              <span className="text-primary font-bold">Pro Tip:</span> Try our
              demo wallet to explore secure transactions and agent settlements
              without any real risk.
            </div>
          </CardContent>
        </Card>

        {/* System Uptime Card */}
        <Card className="bg-primary shadow-none shadow-primary/20 text-primary-foreground border-none">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">
                System Uptime
              </p>
              <h4 className="text-2xl font-black">99.9% LIVE</h4>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesStats;
