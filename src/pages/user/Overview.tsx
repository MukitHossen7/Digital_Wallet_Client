/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useMemo, useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
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
import { useGetMeWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMeTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";

// Types remain unchanged...
export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export type TxStatus = "COMPLETED" | "PENDING" | "FAILED" | "REVERSED";

export interface RecentTx {
  id: string;
  type: TxType;
  initiatedBy: string;
  amount: number;
  status: TxStatus;
  createdAt: string;
}

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
    color: "text-emerald-600 dark:text-emerald-400",
    icon: <ArrowDownToLine className="h-4 w-4" />,
  },
  WITHDRAW: {
    label: "Withdraw",
    color: "text-rose-600 dark:text-rose-400",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  SEND_MONEY: {
    label: "Send Money",
    color: "text-blue-600 dark:text-blue-400",
    icon: <Send className="h-4 w-4" />,
  },
};

export default function Overview() {
  const { data: walletData, isLoading: walletLoading } =
    useGetMeWalletQuery(undefined);
  const { data: transactionData, isLoading: transactionLoading } =
    useGetMeTransactionQuery({
      page: 1,
      limit: 10,
      type: "all",
    });
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);

  const balanceText = useMemo(
    () => (hidden ? "••••••" : formatBDT(walletData?.data?.balance ?? 0)),
    [hidden, walletData?.data?.balance]
  );

  function goAction(tab: "deposit" | "withdraw" | "send") {
    navigate(`/user/wallet/?tab=${tab}`);
  }

  const recentTransactions: RecentTx[] = transactionData?.data
    ?.slice()
    ?.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    ?.slice(0, 5);

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8">
      <Helmet>
        <title>Dashboard | NEOPAY</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Account <span className="text-primary">Overview</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your digital assets securely.
          </p>
        </div>
        <Badge className="rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
          Account Active
        </Badge>
      </div>

      {/* Top Row: Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 relative overflow-hidden border-none bg-gradient-to-br from-primary via-primary/90 to-emerald-700 text-primary-foreground shadow-2xl shadow-primary/20 p-2 sm:p-4">
          <div className="absolute right-[-40px] top-[-40px] h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <CardHeader className="flex-row items-center justify-between space-y-0 pb-7 relative z-10">
            <div>
              <CardDescription className="text-primary-foreground/80 font-bold uppercase tracking-widest text-xs">
                Available Balance
              </CardDescription>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 tracking-tighter">
                {walletLoading ? (
                  <Skeleton className="h-12 w-48 bg-white/20" />
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
                    className="h-12 w-12 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/10 transition-transform active:scale-90"
                    onClick={() => setHidden((v) => !v)}
                  >
                    {hidden ? (
                      <Eye className="h-6 w-6" />
                    ) : (
                      <EyeOff className="h-6 w-6" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show/Hide Balance</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>Encrypted OTP</span>
              </div>
              <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <TrendingUp className="h-4 w-4" />
                <span>Instant Transfer</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Info Card */}
        <Card className="lg:col-span-4 bg-card border-border/50 shadow-sm border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Security Center
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[13px] space-y-4 font-medium text-muted-foreground">
            <div className="p-3 rounded-xl bg-muted/50 border border-border/40">
              Don't share your PIN or OTP with anyone to keep your account safe.
            </div>
            <div className="p-3 rounded-xl bg-muted/50 border border-border/40">
              Cash-in transactions are usually updated within seconds.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Quick Services</h2>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
            One-tap Start
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <ActionCard
            title="Deposit"
            description="Add money from Bank"
            icon={<ArrowDownToLine className="h-6 w-6" />}
            onClick={() => goAction("deposit")}
          />
          <ActionCard
            title="Withdraw"
            description="Cash out at Agent"
            icon={<ArrowUpFromLine className="h-6 w-6" />}
            onClick={() => goAction("withdraw")}
          />
          <ActionCard
            title="Send Money"
            description="Transfer to any user"
            icon={<Send className="h-6 w-6" />}
            onClick={() => goAction("send")}
          />
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <Button
            variant="ghost"
            className="rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all"
            size="sm"
            onClick={() => navigate("/user/transactions-history")}
          >
            View Full History
          </Button>
        </div>

        {transactionLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : recentTransactions?.length > 0 ? (
          <Card className="border-border/50 shadow-xl shadow-black/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px] font-bold">Type</TableHead>
                    <TableHead className="font-bold hidden md:table-cell">
                      Initiated By
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Amount
                    </TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold hidden lg:table-cell">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions?.map((tx, idx: any) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2.5 rounded-xl ${
                              typeMeta[tx.type].color
                            } bg-current/10 group-hover:scale-110 transition-transform`}
                          >
                            {typeMeta[tx.type].icon}
                          </div>
                          <span className="font-bold text-sm tracking-tight">
                            {typeMeta[tx.type].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium hidden md:table-cell">
                        {tx.initiatedBy || "Self"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-black tabular-nums ${
                          tx.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {tx.amount >= 0
                          ? `+${formatBDT(tx.amount)}`
                          : formatBDT(tx.amount)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={tx.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-right text-xs font-medium hidden lg:table-cell">
                        {formatTime(tx.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
