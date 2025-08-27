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
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import StatCard from "@/components/modules/agent/overview/StatCard";
import { useGetTransactionSummeryQuery } from "@/redux/features/transaction/transaction.api";

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

// -------------------- Component --------------------
export default function AgentOverview() {
  const { data: getTransactionSummery } =
    useGetTransactionSummeryQuery(undefined);
  const { last7DaysSummary, weeklyGraph, recentActivity } =
    getTransactionSummery?.data || {};
  const [loading, setLoading] = useState(true);
  const [daily, setDaily] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const theme = useTheme();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(getTransactionSummery?.data);

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

    // Format recent activity
    const recentTx = recentActivity?.map((tx: any) => ({
      id: tx._id,
      type: tx.type,
      title: tx.type === "ADD_MONEY" ? "Agent cash-in" : "Cash-out",
      amount: tx.amount,
      status: tx.status,
      createdAt: tx.createdAt,
    }));
    setRecent(recentTx);
    setLoading(false);
  }, [last7DaysSummary, weeklyGraph, recentActivity]);

  const totalInWeek =
    last7DaysSummary?.find((d: any) => d._id === "ADD_MONEY")?.totalAmount || 0;

  const totalOutWeek =
    last7DaysSummary?.find((d: any) => d._id === "WITHDRAW")?.totalAmount || 0;

  const netWeek = totalInWeek - totalOutWeek;
  const today = daily[daily.length - 1];

  const barColors =
    theme.theme === "dark"
      ? { cashIn: "#22c55e", cashOut: "#f87171" }
      : { cashIn: "#10B981", cashOut: "#EF4444" };
  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
            <Wallet className="h-7 w-7 text-primary" /> Overview
          </h1>
          <p className="text-muted-foreground">
            Cash-in / Cash-out summary & recent activity
          </p>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          Active
        </Badge>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Cash In (7d)"
          value={loading ? null : fmt(totalInWeek)}
          icon={<ArrowDownToLine className="h-5 w-5" />}
          hint="Total cash-in in last 7 days"
          color="emerald"
          loading={loading}
        />
        <StatCard
          title="Cash Out (7d)"
          value={loading ? null : fmt(totalOutWeek)}
          icon={<ArrowUpFromLine className="h-5 w-5" />}
          hint="Total cash-out in last 7 days"
          color="rose"
          loading={loading}
        />
        <StatCard
          title="Net flow"
          value={loading ? null : fmt(netWeek)}
          icon={<TrendingUp className="h-5 w-5" />}
          hint="Net inflow this week"
          color="primary"
          loading={loading}
        />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Cash Flow</CardTitle>
            <CardDescription>
              Daily cash-in vs cash-out (last 7 days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={daily}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => fmt(Number(value))} />
                    <Legend />
                    <Bar
                      dataKey="cashIn"
                      name="Cash In"
                      stackId="a"
                      barSize={18}
                      fill={barColors.cashIn}
                    />
                    <Bar
                      dataKey="cashOut"
                      name="Cash Out"
                      stackId="a"
                      barSize={18}
                      fill={barColors.cashOut}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
              <div>
                Today:{" "}
                <strong className="text-primary">
                  {loading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    fmt(today.cashIn - today.cashOut)
                  )}
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Smooth transfers & low fees
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions & quick glance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {recent?.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-3 p-2 hover:bg-muted/20 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {r.type.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${
                          r.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {r.amount >= 0
                          ? `+${fmt(r.amount)}`
                          : `${fmt(r.amount)}`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
