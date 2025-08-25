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
  TableCaption,
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

// -------------------- Types --------------------
export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export type TxStatus = "COMPLETED" | "PENDING" | "FAILED";
export interface TxItem {
  id: string;
  type: TxType;
  title: string;
  counterparty?: string;
  amount: number; // positive = inflow, negative = outflow
  status: TxStatus;
  createdAt: string; // ISO
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

// -------------------- Mock data (replace with RTK Query later) --------------------
const MOCK_TX: TxItem[] = Array.from({ length: 58 }).map((_, i) => {
  const now = Date.now();
  const dayOffset = Math.floor(Math.random() * 60);
  const type: TxType = (["ADD_MONEY", "WITHDRAW", "SEND_MONEY"] as TxType[])[
    Math.floor(Math.random() * 3)
  ];
  const status: TxStatus = (["COMPLETED", "PENDING", "FAILED"] as TxStatus[])[
    Math.floor(Math.random() * 3)
  ];
  const base = type === "ADD_MONEY" ? 1000 : 500;
  const sign = type === "ADD_MONEY" ? 1 : -1;
  const amount = sign * (base + Math.floor(Math.random() * 4500));
  return {
    id: `TX-${1000 + i}`,
    type,
    title:
      type === "ADD_MONEY"
        ? "Deposit from Agent"
        : type === "WITHDRAW"
        ? "Cash-out to Agent"
        : "Send to Contact",
    counterparty:
      type === "SEND_MONEY"
        ? ["+8801711****44", "ayesha@example.com", "rahim@inbox.com"][i % 3]
        : `Agent #${100 + (i % 50)}`,
    amount,
    status,
    createdAt: new Date(
      now - dayOffset * 24 * 60 * 60 * 1000 - (i % 24) * 60 * 60 * 1000
    ).toISOString(),
  } as TxItem;
});

// -------------------- Component --------------------
export default function TransactionHistory() {
  // TODO: Replace with RTK Query
  // const { data, isLoading } = useGetTransactionsQuery({ page, pageSize, type, from, to })

  const [loading, setLoading] = useState(true);
  const [tx, setTx] = useState<TxItem[]>([]);

  // filters
  const [type, setType] = useState<"all" | TxType>("all");
  const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
  const [to, setTo] = useState<string>("");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const t = setTimeout(() => {
      setTx(MOCK_TX);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [type, from, to, pageSize]);

  const filtered = useMemo(() => {
    let list = [...tx];
    if (type !== "all") list = list.filter((x) => x.type === type);
    if (from)
      list = list.filter(
        (x) => new Date(x.createdAt) >= new Date(from + "T00:00:00")
      );
    if (to)
      list = list.filter(
        (x) => new Date(x.createdAt) <= new Date(to + "T23:59:59")
      );
    // newest first
    list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list;
  }, [tx, type, from, to]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

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
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdraw">Withdraw</SelectItem>
                  <SelectItem value="send">Send</SelectItem>
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
          {loading ? (
            <div className="space-y-2 py-4">
              {Array.from({ length: 8 }).map((_, i) => (
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
                    <TableHead>Title</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((t) => (
                    <TableRow key={t.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-2 ${
                            typeMeta[t.type].color
                          }`}
                        >
                          {typeMeta[t.type].icon}
                          <span className="font-medium">
                            {typeMeta[t.type].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[280px] truncate">
                        {t.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.counterparty ?? "—"}
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
                      <TableCell className="text-muted-foreground">
                        {new Date(t.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="text-left">
                  Use filters above to narrow down the list.
                </TableCaption>
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
                  <Label htmlFor="pageSize" className="text-sm">
                    Rows
                  </Label>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(v) => setPageSize(Number(v))}
                  >
                    <SelectTrigger
                      id="pageSize"
                      className="h-8 w-[90px] rounded-xl"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-xl"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      aria-label="First page"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-xl"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      aria-label="Previous page"
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
                      className="h-8 w-8 rounded-xl"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-xl"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      aria-label="Last page"
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
