/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  Wallet,
  Users,
  LayoutDashboard,
  Activity,
} from "lucide-react";

interface ChartProps {
  userData: any;
  agentData: any;
  transactionData: any;
  transactionVolume: any;
  isLoading: boolean;
}

export function AdminAnalyticsChart({
  userData,
  agentData,
  transactionData,
  transactionVolume,
  isLoading,
}: ChartProps) {
  const chartData = [
    { name: "Users", value: userData?.data?.length || 0 },
    { name: "Agents", value: agentData?.data?.length || 0 },
    { name: "Transactions", value: transactionData?.meta?.total || 0 },
    { name: "Volume", value: (transactionVolume?.data || 0) / 100 },
  ];

  if (isLoading) {
    return (
      <Skeleton className="h-[300px] md:h-[450px] w-full rounded-[2rem] md:rounded-[2.5rem] bg-muted/20" />
    );
  }

  return (
    <Card className="group border-none shadow-none bg-card/60 dark:bg-card/20 backdrop-blur-3xl rounded-lg md:rounded-lg overflow-hidden transition-all duration-500 border border-border/40">
      <CardHeader className="p-6 md:p-10 pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 dark:bg-primary/10 rounded-2xl animate-pulse">
                <Activity className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl  font-bold tracking-tight text-foreground">
                Growth <span className="text-primary">Analysis</span>
              </CardTitle>
            </div>
            <CardDescription className="text-sm  font-medium text-muted-foreground/80">
              Real-time platform statistics & financial flow
            </CardDescription>
          </div>

          <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 p-3 md:p-4 rounded-lg border border-border/50 shadow-none">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                Total Volume
              </span>
              <span className="text-lg md:text-xl font-black text-foreground">
                ৳{(transactionVolume?.data || 0).toLocaleString()}
              </span>
            </div>
            <div className="p-2 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/30">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 sm:p-6 md:p-10">
        <div className="h-[250px] md:h-[300px]   w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="fintechGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                stroke="currentColor"
                className="text-border/40"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", fontSize: 11, fontWeight: 700 }}
                className="text-muted-foreground"
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", fontSize: 11 }}
                className="text-muted-foreground"
              />
              <Tooltip
                cursor={{
                  stroke: "var(--primary)",
                  strokeWidth: 2,
                  strokeDasharray: "6 6",
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card/95 dark:bg-zinc-900 backdrop-blur-2xl border border-border shadow-2xl p-4 rounded-2xl animate-in zoom-in-95">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">
                          {payload[0].payload.name}
                        </p>
                        <p className="text-xl font-black text-primary">
                          {payload[0].payload.name === "Volume" ? "৳" : ""}
                          {payload[0].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#fintechGradient)"
                activeDot={{
                  r: 8,
                  strokeWidth: 2,
                  stroke: "var(--background)",
                  fill: "var(--primary)",
                }}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Responsive Grid System: Mobile (2 cols), Desktop (4 cols) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12 pt-8 border-t border-border/40">
          <StatMiniItem
            label="Users"
            value={userData?.data?.length || 0}
            icon={<Users className="h-5 w-5" />}
            color="bg-blue-500/10 text-blue-500"
          />
          <StatMiniItem
            label="Agents"
            value={agentData?.data?.length || 0}
            icon={<LayoutDashboard className="h-5 w-5" />}
            color="bg-amber-500/10 text-amber-500"
          />
          <StatMiniItem
            label="Transactions"
            value={transactionData?.meta?.total || 0}
            icon={<Activity className="h-5 w-5" />}
            color="bg-emerald-500/10 text-emerald-500"
          />
          <StatMiniItem
            label="Avg. Vol"
            value={Math.round(
              (transactionVolume?.data || 0) /
                (transactionData?.meta?.total || 1)
            )}
            icon={<Wallet className="h-5 w-5" />}
            color="bg-purple-500/10 text-purple-500"
            isCurrency
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatMiniItem({ label, value, icon, color, isCurrency = false }: any) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 p-4 rounded-[1.5rem] hover:bg-muted/30 transition-all duration-300 group/item">
      <div
        className={`p-3 rounded-2xl ${color} shadow-sm group-hover/item:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-bold uppercase text-muted-foreground tracking-tighter truncate">
          {label}
        </p>
        <p className="text-sm md:text-lg font-bold text-foreground truncate">
          {isCurrency ? "৳" : ""}
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
