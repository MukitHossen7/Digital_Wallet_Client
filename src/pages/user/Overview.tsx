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

// -------------------- Types --------------------
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
    () => (hidden ? "••••••" : walletData?.data?.balance ?? 0),
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
    <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>NEOPAY - Digital Wallet for NEOPAY</title>
        <meta name="description" content="This is Overview Page" />
      </Helmet>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1" data-tour="overview-title">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
            Wallet Overview
          </h1>
          <p className="text-muted-foreground">
            A fast, secure wallet experience
          </p>
        </div>
        <Badge className="rounded-full text-green-500 bg-green-100">
          Active
        </Badge>
      </div>

      {/* Top Row: Balance + Security blurb */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-4 items-stretch space-y-4 lg:space-y-0">
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
              <CardTitle className="text-3xl md:text-4xl mt-1">
                BDT{" "}
                {walletLoading ? (
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

        <Card className="bg-muted/40 w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">At a glance</CardTitle>
            <CardDescription>Key tips for smooth transfers</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2 ">
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

      <div>
        {/* Quick Actions */}
        <section className="space-y-3" data-tour="quick-actions">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="text-sm text-muted-foreground">
              One-tap to start
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>

      <Separator />

      <div className="overflow-x-auto">
        {/* Recent Transactions */}
        <section className="space-y-3" data-tour="recent">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button
              variant="ghost"
              className="rounded-full"
              size="sm"
              onClick={() => navigate("/user/transactions-history")}
            >
              View all
            </Button>
          </div>
          {transactionLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-6 w-full" />
                </Card>
              ))}
            </div>
          ) : transactionData?.data && recentTransactions?.length > 0 ? (
            <Card>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>InitiatedBy</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Transaction Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions?.map((tx, idx: any) => (
                      <TableRow key={idx} className="hover:bg-muted/50">
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

                        <TableCell className="text-muted-foreground">
                          {tx.initiatedBy ?? "_"}
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${
                            tx.amount >= 0
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {tx.amount >= 0
                            ? `+${formatBDT(tx.amount)}`
                            : `${formatBDT(tx.amount)}`}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={tx.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-right">
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
    </div>
  );
}
