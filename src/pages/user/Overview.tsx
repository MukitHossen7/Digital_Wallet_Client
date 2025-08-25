import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Wallet,
  Eye,
  EyeOff,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  Info,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import ActionCard from "@/components/modules/user/overview/ActionCard";
import StatusBadge from "@/components/modules/user/overview/StatusBadge";
import EmptyState from "@/components/modules/user/overview/EmptyState";

// -------------------- Types --------------------
export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export type TxStatus = "COMPLETED" | "PENDING" | "FAILED" | "REVERSED";

export interface RecentTx {
  id: string;
  type: TxType;
  title: string; // e.g. Deposit from Agent 1033
  counterparty?: string; // e.g. +88017...
  amount: number; // positive for inflow, negative for outflow
  status: TxStatus;
  createdAt: string; // ISO
}

export interface OverviewData {
  balance: number;
  recent: RecentTx[];
}

// -------------------- Utils --------------------
const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
});
const formatBDT = (n: number) => {
  try {
    return BDT.format(n);
  } catch {
    return `৳${n.toLocaleString("en-BD", { maximumFractionDigits: 2 })}`;
  }
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const typeMeta: Record<
  TxType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  ADD_MONEY: {
    label: "Deposit",
    color: "text-emerald-600",
    icon: <ArrowDownToLine className="h-4 w-4" />,
  },
  WITHDRAW: {
    label: "Withdraw",
    color: "text-rose-600",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  SEND_MONEY: {
    label: "Send Money",
    color: "text-blue-600",
    icon: <Send className="h-4 w-4" />,
  },
};

// -------------------- Mock (replace with RTK Query) --------------------
const MOCK: OverviewData = {
  balance: 12540.5,
  recent: [
    {
      id: "tx_1001",
      type: "ADD_MONEY",
      title: "Deposit from Agent #1033",
      counterparty: "Agent 1033",
      amount: 2500,
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    },
    {
      id: "tx_1002",
      type: "WITHDRAW",
      title: "Cash-out to Agent #204",
      counterparty: "Agent 204",
      amount: -1000,
      status: "PENDING",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    },
    {
      id: "tx_1003",
      type: "SEND_MONEY",
      title: "Send to Ayesha Khan",
      counterparty: "+8801711223344",
      amount: -1500,
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 1d ago
    },
    {
      id: "tx_1004",
      type: "SEND_MONEY",
      title: "Send to Rahim Uddin",
      counterparty: "rahim@inbox.com",
      amount: -750,
      status: "FAILED",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3d ago
    },
    {
      id: "tx_1005",
      type: "ADD_MONEY",
      title: "Deposit from Bank",
      counterparty: "DBBL",
      amount: 5000,
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6d ago
    },
  ],
};

// -------------------- Component --------------------
export default function Overview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    // TODO: Replace with RTK Query: const { data, isLoading } = useGetOverviewQuery()
    const t = setTimeout(() => {
      setData(MOCK);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const balanceText = useMemo(
    () => (hidden ? "••••••" : formatBDT(data?.balance ?? 0)),
    [hidden, data]
  );

  function goAction(tab: "deposit" | "withdraw" | "send") {
    navigate(`/user/wallet/?tab=${tab}`);
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1" data-tour="overview-title">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
            <Wallet className="h-7 w-7 text-primary" /> Wallet Overview
          </h1>
          <p className="text-muted-foreground">
            A fast, secure wallet experience
          </p>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          Live
        </Badge>
      </div>

      {/* Top Row: Balance + Security blurb */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        <Card
          className="relative overflow-hidden md:col-span-2 border-none bg-gradient-to-br from-primary/90 via-primary to-primary/70 text-primary-foreground shadow-md"
          data-tour="balance"
        >
          <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardDescription className="text-primary-foreground/80">
                Available Balance
              </CardDescription>
              <CardTitle className="text-4xl mt-1">
                {loading ? (
                  <Skeleton className="h-10 w-52 bg-white/30" />
                ) : (
                  balanceText
                )}
              </CardTitle>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-xl"
                    aria-label="Toggle balance visibility"
                    onClick={() => setHidden((v) => !v)}
                  >
                    {hidden ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hide / show balance</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Device binding & OTP secured</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Low fees, instant transfers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">At a glance</CardTitle>
            <CardDescription>Key tips for smooth transfers</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Verify recipient name before sending.</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Cash-in via agent is instant after code confirm.</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Keep your credentials secure</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <section className="space-y-3" data-tour="quick-actions">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="text-sm text-muted-foreground">One-tap to start</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionCard
            title="Deposit"
            description="Add money via bank or agent"
            icon={<ArrowDownToLine className="h-5 w-5" />}
            onClick={() => goAction("deposit")}
          />
          <ActionCard
            title="Withdraw"
            description="Cash out to bank or agent"
            icon={<ArrowUpFromLine className="h-5 w-5" />}
            onClick={() => goAction("withdraw")}
          />
          <ActionCard
            title="Send Money"
            description="Transfer to phone or email"
            icon={<Send className="h-5 w-5" />}
            onClick={() => goAction("send")}
          />
        </div>
      </section>

      <Separator />

      {/* Recent Transactions */}
      <section className="space-y-3" data-tour="recent">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={() => navigate("/dashboard/transactions")}
          >
            View all
          </Button>
        </div>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-full" />
              </Card>
            ))}
          </div>
        ) : data && data.recent.length > 0 ? (
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recent.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-2 ${
                            typeMeta[tx.type].color
                          }`}
                        >
                          {typeMeta[tx.type].icon}
                          <span className="font-medium">
                            {typeMeta[tx.type].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[260px] truncate">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {tx.type.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-tight">
                            <div className="font-medium">{tx.title}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: {tx.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tx.counterparty ?? "—"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          tx.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {tx.amount >= 0
                          ? `+${formatBDT(tx.amount)}`
                          : `${formatBDT(tx.amount)}`}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={tx.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatTime(tx.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="text-left">
                  Only the latest activities are shown here.
                </TableCaption>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
