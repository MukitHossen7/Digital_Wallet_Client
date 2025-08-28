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

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
  }, [last7DaysSummary, weeklyGraph, recentActivity]);

  const chartConfig = {
    cashIn: {
      label: "Cash In",
      color: "var(--chart-1)",
    },
    cashOut: {
      label: "Cash Out",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const totalInWeek =
    last7DaysSummary?.find((d: any) => d._id === "ADD_MONEY")?.totalAmount || 0;

  const totalOutWeek =
    last7DaysSummary?.find((d: any) => d._id === "WITHDRAW")?.totalAmount || 0;

  const netWeek = totalInWeek - totalOutWeek;
  const today = daily[daily.length - 1];

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
          value={isLoading ? null : fmt(totalInWeek)}
          icon={<ArrowDownToLine className="h-5 w-5" />}
          hint="Total cash-in in last 7 days"
          color="emerald"
          loading={isLoading}
        />
        <StatCard
          title="Cash Out (7d)"
          value={isLoading ? null : fmt(totalOutWeek)}
          icon={<ArrowUpFromLine className="h-5 w-5" />}
          hint="Total cash-out in last 7 days"
          color="rose"
          loading={isLoading}
        />
        <StatCard
          title="Net flow"
          value={isLoading ? null : fmt(netWeek)}
          icon={<TrendingUp className="h-5 w-5" />}
          hint="Net inflow this week"
          color="primary"
          loading={isLoading}
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
            {isLoading ? (
              <div className="h-72 flex items-center justify-center">
                <Skeleton className="h-72 w-full" />
              </div>
            ) : (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={daily}
                  margin={{
                    left: -20,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => fmt(value)}
                    width={80}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />

                  <defs>
                    <linearGradient id="fillCashIn" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-cashIn)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-cashIn)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="fillCashOut"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-cashOut)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-cashOut)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <Area
                    dataKey="cashIn"
                    type="natural"
                    fill="url(#fillCashIn)"
                    fillOpacity={0.4}
                    stroke="var(--color-cashIn)"
                    stackId="a"
                  />
                  <Area
                    dataKey="cashOut"
                    type="natural"
                    fill="url(#fillCashOut)"
                    fillOpacity={0.4}
                    stroke="var(--color-cashOut)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
              <div>
                Today:{" "}
                <strong className="text-primary">
                  {isLoading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    fmt(today?.cashIn - today?.cashOut)
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
            {isLoading ? (
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
