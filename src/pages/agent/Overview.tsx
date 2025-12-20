/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Sparkles,
  LayoutDashboard,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatCard from "@/components/modules/agent/overview/StatCard";
import { useGetTransactionSummeryQuery } from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const fmt = (n: number) => {
  try {
    return BDT.format(Math.round(n));
  } catch {
    return `৳${Math.round(n).toLocaleString()}`;
  }
};

export default function AgentOverview() {
  const { data: getTransactionSummery, isLoading } =
    useGetTransactionSummeryQuery(undefined);
  const { last7DaysSummary, weeklyGraph, recentActivity } =
    getTransactionSummery?.data || {};
  const [daily, setDaily] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const graphData = dayNames?.map((day) => ({ day, cashIn: 0, cashOut: 0 }));
    weeklyGraph?.forEach((item: any) => {
      const dayName = dayNames[item._id.day - 1];
      if (item._id.type === "ADD_MONEY")
        graphData[dayNames.indexOf(dayName)].cashIn = item.total;
      else if (item._id.type === "WITHDRAW")
        graphData[dayNames.indexOf(dayName)].cashOut = item.total;
    });
    setDaily(graphData);

    const recentTx = recentActivity?.map((tx: any) => ({
      id: tx._id,
      type: tx.type,
      title: tx.type === "ADD_MONEY" ? "Agent Cash-In" : "Cash-Out",
      amount: tx.amount,
      status: tx.status,
      createdAt: tx.createdAt,
    }));
    setRecent(recentTx);
  }, [last7DaysSummary, weeklyGraph, recentActivity]);

  const chartConfig = {
    cashIn: {
      label: "Cash In",
      color: "oklch(var(--chart-1))",
    },
    cashOut: {
      label: "Cash Out",
      color: "oklch(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalInWeek =
    last7DaysSummary?.find((d: any) => d._id === "ADD_MONEY")?.totalAmount || 0;
  const totalOutWeek =
    last7DaysSummary?.find((d: any) => d._id === "WITHDRAW")?.totalAmount || 0;
  const netWeek = totalInWeek - totalOutWeek;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl container mx-auto py-6 space-y-8"
    >
      <Helmet>
        <title>Agent Overview | NEOPAY</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/40 p-6 rounded-xl border border-border/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <LayoutDashboard className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Agent <span className="text-primary">Overview</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Real-time cash flow & business analytics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-4 py-1.5 rounded-full">
            LIVE SYSTEM
          </Badge>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Cash In (7d)"
          value={isLoading ? null : fmt(totalInWeek)}
          icon={<ArrowDownToLine className="h-6 w-6" />}
          hint="Funds added to users"
          color="emerald"
          loading={isLoading}
        />
        <StatCard
          title="Cash Out (7d)"
          value={isLoading ? null : fmt(totalOutWeek)}
          icon={<ArrowUpFromLine className="h-6 w-6" />}
          hint="Funds withdrawn by users"
          color="rose"
          loading={isLoading}
        />
        <StatCard
          title="Net Revenue"
          value={isLoading ? null : fmt(netWeek)}
          icon={<TrendingUp className="h-6 w-6" />}
          hint="Weekly business net flow"
          color="primary"
          loading={isLoading}
        />
      </div>

      {/* Main Content: Chart & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border border-border/50 shadow-none shadow-primary/5 bg-card/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-primary/10 group rounded-lg">
          <CardHeader className="p-6 sm:p-8 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </div>
                  Financial Growth
                </CardTitle>
                <CardDescription className="font-bold text-muted-foreground/80 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Real-time Inflow vs Outflow analysis
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 bg-background/50 dark:bg-muted/20 px-4 py-2 rounded-2xl border border-border/50 backdrop-blur-sm self-start">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Last 7 Days
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-2 sm:p-6 md:p-8">
            {isLoading ? (
              <div className="h-[300px]  w-full">
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            ) : (
              <div className="h-[300px] w-full ">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={daily}
                      margin={{ left: 0, right: 10, top: 10, bottom: 0 }}
                    >
                      <defs>
                        {/* Inflow Gradient - Emerald/Forest Green */}
                        <linearGradient
                          id="fillCashIn"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--color-chart-1)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-chart-1)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        {/* Outflow Gradient - Golden/Fintech Yellow */}
                        <linearGradient
                          id="fillCashOut"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--color-chart-2)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-chart-2)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="oklch(var(--border))"
                        opacity={0.5}
                      />

                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "oklch(var(--muted-foreground))",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                        tickMargin={15}
                      />

                      <YAxis hide domain={["auto", "auto"]} />

                      <ChartTooltip
                        cursor={{
                          stroke: "oklch(var(--primary))",
                          strokeWidth: 2,
                          strokeDasharray: "4 4",
                        }}
                        content={
                          <ChartTooltipContent
                            indicator="dot"
                            className="bg-card/95 backdrop-blur-md border-border shadow-2xl rounded-2xl p-4 min-w-[150px]"
                          />
                        }
                      />

                      {/* Cash In Area (Primary Green) */}
                      <Area
                        dataKey="cashIn"
                        type="monotone"
                        fill="url(#fillCashIn)"
                        stroke="var(--color-chart-1)"
                        strokeWidth={4}
                        activeDot={{ r: 8, strokeWidth: 2, stroke: "white" }}
                        animationDuration={1500}
                        // Glowing effect for dark mode
                        className="drop-shadow-[0_0_8px_rgba(0,177,79,0.4)]"
                      />

                      {/* Cash Out Area (Golden Yellow) */}
                      <Area
                        dataKey="cashOut"
                        type="monotone"
                        fill="url(#fillCashOut)"
                        stroke="var(--color-chart-2)"
                        strokeWidth={4}
                        activeDot={{ r: 8, strokeWidth: 2, stroke: "white" }}
                        animationDuration={2000}
                        // Glowing effect for dark mode
                        className="drop-shadow-[0_0_8px_rgba(209,168,0,0.4)]"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-primary/5 dark:bg-primary/10 p-6 border-t border-border/40 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/20 rounded-xl">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight">
                    Secure Business Protocol
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Encryption Active v2.0
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,177,79,0.5)]" />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Inflow
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[oklch(var(--chart-2))] shadow-[0_0_10px_rgba(209,168,0,0.5)]" />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Outflow
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-5 hidden sm:block bg-border/60"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex h-8 gap-2 font-black text-[10px] uppercase tracking-tighter text-primary"
                >
                  Details <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Recent Activity Card */}
        <Card className="border-none shadow-none shadow-black/5 bg-card/60 backdrop-blur-xl rounded-[2rem] flex flex-col">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold tracking-tight">
              Recent Activity
            </CardTitle>
            <CardDescription className="font-medium">
              Latest terminal events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-1">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recent?.map((r) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={r.id}
                    className="flex items-center justify-between p-3.5 hover:bg-primary/5 rounded-2xl transition-colors border border-transparent hover:border-primary/10"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11 rounded-xl shadow-inner border border-border/50">
                        <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                          {r.type.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-sm tracking-tight">
                          {r.title}
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          {new Date(r.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          • {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-black text-sm ${
                          r.amount >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {r.amount >= 0 ? `+${fmt(r.amount)}` : fmt(r.amount)}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[9px] font-black h-4 px-1.5 uppercase border-muted-foreground/20 text-muted-foreground"
                      >
                        {r.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button
              variant="outline"
              className="w-full rounded-2xl font-bold text-xs border-primary/20 text-primary hover:bg-primary hover:text-white transition-all"
            >
              VIEW FULL STATEMENT
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// Button implementation just for the example if not imported
const Button = ({ className, children, ...props }: any) => (
  <button
    className={`px-4 py-2 flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </button>
);
