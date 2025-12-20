/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  History,
  ArrowUpRight,
} from "lucide-react";
import { useGetMeTransactionQuery } from "@/redux/features/transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/modules/user/transaction/StatusBadge";

import EmptyState from "@/components/modules/user/transaction/EmptyState";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
type TxStatus = "COMPLETED" | "PENDING" | "FAILED";

interface Transaction {
  _id: string;
  type: TxType;
  title: string;
  amount: number;
  status: TxStatus;
  initiatedBy: string;
  createdAt: string;
}

const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
});

const typeMeta: Record<
  TxType,
  { label: string; color: string; icon: React.ReactNode; bg: string }
> = {
  ADD_MONEY: {
    label: "Deposit",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: <ArrowDownToLine className="h-4 w-4" />,
  },
  WITHDRAW: {
    label: "Withdraw",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  SEND_MONEY: {
    label: "Send Money",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: <Send className="h-4 w-4" />,
  },
};

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: transactionData, isLoading: transactionLoading } =
    useGetMeTransactionQuery({
      page: page,
      limit: pageSize,
      type: "all",
    });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const tx = useMemo(() => transactionData?.data ?? [], [transactionData]);
  const total = transactionData?.meta?.total ?? 0;
  const totalPages = transactionData?.meta?.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = tx;

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>Statement | NEOPAY Transaction History</title>
        <meta name="description" content="View all wallet transactions" />
      </Helmet>

      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card/40 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-lg shadow-none shadow-primary/5">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3.5 rounded-2xl shadow-lg shadow-primary/20 text-white">
            <History className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Statement
            </h1>
            <p className="text-muted-foreground font-medium text-sm md:text-base">
              Digital ledger of all your recent wallet activities.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Real-time Logging
          </span>
        </div>
      </div>

      {/* Transactions Table Card */}
      <Card className="border-none shadow-none shadow-black/[0.03] rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/30 pb-6 border-b border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">
                Transaction History
              </CardTitle>
              <CardDescription className="font-medium">
                Showing {total} total records handled by you
              </CardDescription>
            </div>
            <div className="bg-background px-4 py-1 rounded-xl border border-border/50 shadow-none">
              <span className="text-xs font-bold text-muted-foreground uppercase">
                Current Page:{" "}
              </span>
              <span className="text-sm font-black text-primary">
                {page} / {totalPages}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-2 md:p-4">
          {transactionLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : pageItems?.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader className="bg-transparent">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="font-black uppercase tracking-widest text-[11px] text-muted-foreground/80 py-6 pl-8">
                      Transaction Type
                    </TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[11px] text-muted-foreground/80 py-6">
                      Initiated By
                    </TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[11px] text-muted-foreground/80 py-6">
                      Amount
                    </TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[11px] text-muted-foreground/80 py-6">
                      Status
                    </TableHead>
                    <TableHead className="text-right font-black uppercase tracking-widest text-[11px] text-muted-foreground/80 py-6 pr-8">
                      Date & Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems?.map((data: Transaction, idx: any) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={data._id}
                      className="group border-b border-border/40 hover:bg-primary/[0.02] transition-colors"
                    >
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                              typeMeta[data.type as TxType].bg
                            } ${typeMeta[data.type as TxType].color}`}
                          >
                            {typeMeta[data.type as TxType].icon}
                          </div>
                          <div>
                            <span className="font-bold text-sm tracking-tight text-foreground block">
                              {typeMeta[data.type as TxType].label}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">
                              TRX: {data._id.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-muted-foreground tracking-tight">
                            {data.initiatedBy}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div
                          className={`text-base font-bold tracking-tighter tabular-nums ${
                            data.amount >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {data.amount >= 0
                            ? `+ ${BDT.format(data.amount)}`
                            : `${BDT.format(data.amount)}`}
                        </div>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={data.status} />
                      </TableCell>

                      <TableCell className="text-right pr-8">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-foreground tracking-tight">
                            {new Date(data.createdAt).toLocaleDateString(
                              undefined,
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-[10px] font-black text-muted-foreground uppercase opacity-70">
                            {new Date(data.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              {/* Modern Pagination UI */}
              <div className="px-8 py-8 bg-muted/10 border-t border-border/40">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-background border border-border/50 flex items-center justify-center shadow-sm">
                      <ArrowUpRight className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground tracking-tight">
                      Showing{" "}
                      <span className="text-foreground font-black">
                        {start + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-foreground font-black">{end}</span>{" "}
                      of{" "}
                      <span className="text-foreground font-black">
                        {total}
                      </span>{" "}
                      entries
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 p-1.5 bg-background rounded-2xl border border-border shadow-none">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="px-5 h-10 flex items-center justify-center text-xs font-black uppercase tracking-widest text-primary bg-primary/5 rounded-xl border border-primary/10">
                      Page {page} of {totalPages}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 animate-in zoom-in-95 duration-500">
              <EmptyState />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance & Tip Section */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm font-bold text-primary">
          <ArrowDownToLine className="h-5 w-5" />
          <span>
            This statement is digitally generated and requires no physical
            signature.
          </span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 text-center md:text-right">
          Security Audited Transaction Layer • 256-bit AES Encrypted
        </div>
      </div>
    </div>
  );
}
