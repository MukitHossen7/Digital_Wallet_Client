/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useGetALLTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Calendar,
  User,
  Hash,
  LayoutGrid,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/modules/user/transaction/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/modules/user/transaction/EmptyState";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";

const typeMeta: Record<
  string,
  { label: string; color: string; bgColor: string; icon: React.ReactNode }
> = {
  ADD_MONEY: {
    label: "Cash In",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    icon: <ArrowDownToLine className="h-4 w-4" />,
  },
  WITHDRAW: {
    label: "Cash Out",
    color: "text-rose-600",
    bgColor: "bg-rose-500/10",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  SEND_MONEY: {
    label: "Send Money",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    icon: <Send className="h-4 w-4" />,
  },
};

// Fallback for missing types to prevent crash
const getMeta = (type: string) => {
  return (
    typeMeta[type] || {
      label: type || "Transaction",
      color: "text-slate-600",
      bgColor: "bg-slate-500/10",
      icon: <Hash className="h-4 w-4" />,
    }
  );
};

const AllTransaction = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: transactionData, isLoading } = useGetALLTransactionQuery({
    page,
    limit: pageSize,
    search: debouncedSearch,
    type: category,
    status,
  });

  const transactions = useMemo(
    () => transactionData?.data ?? [],
    [transactionData]
  );
  const total = transactionData?.meta?.total ?? 0;
  const totalPages = transactionData?.meta?.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8">
      <Helmet>
        <title>All Transactions | NEOPAY Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <LayoutGrid className="h-6 w-6 text-primary" />
            Transactions
          </h1>
          <p className="text-muted-foreground font-medium">
            Monitoring all financial flows.
          </p>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="border-none shadow-none bg-card/60 backdrop-blur-md">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              placeholder="Search amount or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 border-border rounded-xl w-full"
            />
          </div>

          <Select onValueChange={setCategory}>
            <SelectTrigger className="bg-background/50 rounded-xl w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ADD_MONEY">Cash In</SelectItem>
              <SelectItem value="SEND_MONEY">Send Money</SelectItem>
              <SelectItem value="WITHDRAW">Cash Out</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatus}>
            <SelectTrigger className="bg-background/50 rounded-xl w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="rounded-xl font-bold uppercase text-[10px] tracking-widest border-primary/20"
          >
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/* Transactions Data */}
      {isLoading ? (
        <div className="p-8 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      ) : transactions?.length > 0 ? (
        <div className="space-y-6">
          {/* ---- CARD VIEW: (SM, MD, LG) ---- */}
          <div className="xl:hidden grid grid-cols-1  lg:grid-cols-2 gap-5">
            {transactions.map((tx: any) => {
              const meta = getMeta(tx.type); // Safe type access
              return (
                <motion.div
                  key={tx._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden border shadow-none bg-card group relative h-full rounded-lg">
                    <div
                      className={`absolute left-0 top-0 w-1.5 h-full ${meta.color.replace(
                        "text",
                        "bg"
                      )}`}
                    />
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <div className={`${meta.bgColor} p-2 rounded-lg`}>
                        {meta.icon}
                      </div>
                      <StatusBadge status={tx.status} />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">
                            Amount
                          </p>
                          <p className="text-2xl font-bold">
                            <span className="text-xs font-normal text-muted-foreground mr-1">
                              BDT
                            </span>
                            {tx.amount?.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Type
                          </p>
                          <p className={`text-xs font-bold ${meta.color}`}>
                            {meta.label}
                          </p>
                        </div>
                      </div>
                      <Separator className="opacity-40" />
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <User size={12} /> By
                          </span>
                          <span className="text-foreground">
                            {tx.initiatedBy || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} /> Date
                          </span>
                          <span className="text-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="bg-muted/50 p-2 rounded-lg text-[10px] font-mono text-center truncate">
                          ID: {tx._id}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* ---- TABLE VIEW: (XL) ---- */}
          <div className="hidden xl:block">
            <Card className="border-none shadow-none bg-card/60 backdrop-blur-xl overflow-hidden rounded-2xl border border-border/50">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="py-5 pl-8 font-black uppercase text-[10px] tracking-widest">
                      Transaction ID
                    </TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">
                      Initiator
                    </TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">
                      Type
                    </TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">
                      Amount
                    </TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx: any) => {
                    const meta = getMeta(tx.type);
                    return (
                      <TableRow
                        key={tx._id}
                        className="hover:bg-primary/[0.03] border-border/40"
                      >
                        <TableCell className="font-mono text-[10px] pl-8 font-bold text-primary uppercase tracking-wider">
                          #{tx._id.slice(-12)}
                        </TableCell>
                        <TableCell className="font-bold text-sm">
                          {tx?.initiatedBy || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black gap-2 uppercase ${meta.bgColor} ${meta.color}`}
                          >
                            {meta.icon} {meta.label}
                          </div>
                        </TableCell>
                        <TableCell className="text-base font-bold">
                          BDT {tx?.amount?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={tx.status} />
                        </TableCell>
                        <TableCell className="text-right pr-8 font-bold text-sm text-muted-foreground">
                          {new Date(tx?.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Pagination */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-4">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Record: {start + 1}-{end} / Total: {total}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setPage(1)}
                disabled={page === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="bg-primary/10 text-primary font-black px-4 py-1.5 rounded-xl text-xs mx-2">
                PAGE {page} / {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Footer */}
      <div className="text-center pt-5 border-t border-border/50">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
          Neopay Ecosystem Ledger
        </p>
      </div>
    </div>
  );
};

export default AllTransaction;
