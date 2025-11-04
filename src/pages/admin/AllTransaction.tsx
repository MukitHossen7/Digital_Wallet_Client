/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useGetALLTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
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

export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
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
      clearInterval(handler);
    };
  }, [search]);

  const { data: transactionData, isLoading } = useGetALLTransactionQuery({
    page,
    limit: pageSize,
    search: debouncedSearch,
    type: category,
    status,
  });

  // backend  data
  const transactions = useMemo(
    () => transactionData?.data ?? [],
    [transactionData]
  );
  const total = transactionData?.meta?.total ?? 0;
  const totalPages = transactionData?.meta?.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);

  return (
    <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>Admin Dashboard - NEOPAY</title>
        <meta name="description" content="This is Transactions Page" />
      </Helmet>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Transaction Management
        </h1>
        <p className="text-muted-foreground">
          Monitor and analyze all system transactions
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Filter size={18} /> Filter Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 w-full">
            <Search className="text-muted-foreground" size={18} />
            <Input
              placeholder="Search by amount, or ID ."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ADD_MONEY">Add Money</SelectItem>
              <SelectItem value="SEND_MONEY">Send Money</SelectItem>
              <SelectItem value="WITHDRAW">Cash Out</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <div className="w-full overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : transactions?.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>InitiatedBy</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Transaction Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx: any) => (
                      <TableRow key={tx._id}>
                        <TableCell className="font-medium">{tx._id}</TableCell>
                        <TableCell>{tx?.initiatedBy || "N/A"}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-2 ${
                              typeMeta[tx.type as TxType].color
                            }`}
                          >
                            {typeMeta[tx.type as TxType].icon}
                            <span className="font-medium">
                              {typeMeta[tx.type as TxType].label}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          BDT {tx?.amount}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={tx.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          {new Date(tx?.createdAt).toLocaleString()}
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
              </div>
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllTransaction;
