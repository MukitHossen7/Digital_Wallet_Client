/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ListFilter,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import EmptyState from "@/components/modules/user/transaction/EmptyState";
import StatusBadge from "@/components/modules/user/transaction/StatusBadge";
import { useGetMeTransactionQuery } from "@/redux/features/transaction/transaction.api";

export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export type TxStatus = "COMPLETED" | "PENDING" | "FAILED";
export interface TxItem {
  id: string;
  type: TxType;
  initiatedBy?: string;
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

export default function TransactionHistory() {
  // filters
  const [type, setType] = useState<"all" | TxType>("all");
  const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: transactionData, isLoading } = useGetMeTransactionQuery({
    page: page,
    limit: pageSize,
    type: type,
    fromDate: from,
    toDate: to,
  });

  useEffect(() => {
    setPage(1);
  }, [type, from, to, pageSize]);

  // backend  data
  const tx = useMemo(() => transactionData?.data ?? [], [transactionData]);

  const total = transactionData?.meta.total ?? 0;
  const totalPages = transactionData?.meta.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = tx;
  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
            <ListFilter className="h-7 w-7 text-primary" /> Transaction History
          </h1>
          <p className="text-muted-foreground">
            Filter by type & date range. Built for speed
          </p>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          History
        </Badge>
      </div>

      {/* Filters */}
      <Card data-tour="filters">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListFilter className="h-5 w-5" /> Filters
          </CardTitle>
          <CardDescription>
            Refine your transaction list by type and date window.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1">
              <Label>Type</Label>
              <Select
                defaultValue={type}
                onValueChange={(v) => setType(v as any)}
              >
                <SelectTrigger className="rounded-md mt-1 w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ADD_MONEY">Deposit</SelectItem>
                  <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                  <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="from">From</Label>
              <div className="relative mt-1">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-9 rounded-md w-full"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="to">To</Label>
              <div className="relative mt-1">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="to"
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-9 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className=""
              onClick={() => {
                setType("all");
                setFrom("");
                setTo("");
              }}
            >
              Reset
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{total}</span> results
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transactions</CardTitle>
          <CardDescription>All activities in your wallet</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="space-y-2 py-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} className="p-3">
                  <Skeleton className="h-6 w-full" />
                </Card>
              ))}
            </div>
          ) : pageItems.length > 0 ? (
            <>
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
                  {pageItems.map((t: any, idx: any) => (
                    <TableRow key={idx} className="hover:bg-muted/50">
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-2 ${
                            typeMeta[t.type as TxType].color
                          }`}
                        >
                          {typeMeta[t.type as TxType].icon}
                          <span className="font-medium">
                            {typeMeta[t.type as TxType].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.initiatedBy ?? "—"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          t.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {t.amount >= 0
                          ? `+${formatBDT(t.amount)}`
                          : `${formatBDT(t.amount)}`}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={t.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-right">
                        {new Date(t.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4" />

              {/* Pagination */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{start + 1}</span>–
                  <span className="font-medium">{end}</span> of{" "}
                  <span className="font-medium">{total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="px-3 text-sm">
                      Page <span className="font-medium">{page}</span> /{" "}
                      {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
