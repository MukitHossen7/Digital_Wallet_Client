/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
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

// -------------------- Types --------------------
type TxType = "deposit" | "withdraw" | "send";
type TxStatus = "success" | "pending" | "failed";
interface TxItem {
  id: string;
  type: TxType;
  title: string;
  amount: number; // +ve for inflow, -ve for outflow
  status: TxStatus;
  createdAt: string; // ISO
}

// -------------------- Mock Data --------------------
const MOCK_DAILY = [
  { day: "Mon", cashIn: 5200, cashOut: 2300 },
  { day: "Tue", cashIn: 4100, cashOut: 1800 },
  { day: "Wed", cashIn: 7600, cashOut: 3200 },
  { day: "Thu", cashIn: 3000, cashOut: 1200 },
  { day: "Fri", cashIn: 9200, cashOut: 4400 },
  { day: "Sat", cashIn: 6800, cashOut: 2700 },
  { day: "Sun", cashIn: 5400, cashOut: 2100 },
];

const MOCK_RECENT: TxItem[] = [
  {
    id: "tx_2001",
    type: "deposit",
    title: "Agent cash-in #1033",
    amount: 2500,
    status: "success",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx_2002",
    type: "withdraw",
    title: "Cash-out to Agent #204",
    amount: -1000,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx_2003",
    type: "send",
    title: "Sent to Ayesha Khan",
    amount: -1500,
    status: "success",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx_2004",
    type: "deposit",
    title: "Bank deposit (DBBL)",
    amount: 5000,
    status: "success",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx_2005",
    type: "send",
    title: "Failed transfer to Rahim",
    amount: -750,
    status: "failed",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// -------------------- Helpers --------------------
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

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

// -------------------- Component --------------------
export default function OverviewCashInOutPage() {
  const [loading, setLoading] = useState(true);
  const [daily, setDaily] = useState(MOCK_DAILY);
  const [recent, setRecent] = useState<TxItem[]>([]);
  const theme = useTheme();
  useEffect(() => {
    const t = setTimeout(() => {
      setDaily(MOCK_DAILY);
      setRecent(MOCK_RECENT);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const totalInWeek = useMemo(() => sum(daily.map((d) => d.cashIn)), [daily]);
  const totalOutWeek = useMemo(() => sum(daily.map((d) => d.cashOut)), [daily]);
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
            Cash-in / Cash-out summary & recent activity — বিকাশ অনুরূপ দ্রুত ও
            পরিষ্কার দৃশ্য।
          </p>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          Live
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
                {recent.map((r) => (
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

      <div className="text-sm text-muted-foreground">
        Tip: Click any transaction to see details or export the activity report
        from Reports.
      </div>
    </div>
  );
}

// -------------------- Subcomponents --------------------
function StatCard({
  title,
  value,
  icon,
  hint,
  color = "primary",
  loading = false,
}: {
  title: string;
  value: string | null;
  icon: React.ReactNode;
  hint?: string;
  color?: "emerald" | "rose" | "primary";
  loading?: boolean;
}) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    primary: "bg-primary/5 text-primary",
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]} shadow-sm`}
            >
              {icon}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{title}</div>
              <div className="text-xl font-semibold mt-1">
                {loading ? <Skeleton className="h-6 w-36" /> : value}
              </div>
            </div>
          </div>
          {hint && (
            <div className="text-xs text-muted-foreground mt-2">{hint}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
