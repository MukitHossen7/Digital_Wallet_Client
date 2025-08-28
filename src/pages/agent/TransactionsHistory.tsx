/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Filter,
  FileText,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
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
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/modules/user/transaction/EmptyState";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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
export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: transactionData, isLoading: transactionLoading } =
    useGetMeTransactionQuery({
      page: page,
      limit: pageSize,
      type: "all",
    });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // backend  data
  const tx = useMemo(() => transactionData?.data ?? [], [transactionData]);
  const total = transactionData?.meta?.total ?? 0;
  const totalPages = transactionData?.meta?.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = tx;
  console.log(transactionData);

  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> All Transactions
            </CardTitle>
            <CardDescription>
              View all transactions handled by the agent with status, type, and
              amount
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline flex items-center gap-1">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="btn btn-outline flex items-center gap-1">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {transactionLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : pageItems?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      Transaction Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems?.map((data: Transaction) => (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium capitalize">
                        <div
                          className={`inline-flex items-center gap-2 ${
                            typeMeta[data.type as TxType].color
                          }`}
                        >
                          {typeMeta[data.type as TxType].icon}
                          <span className="font-medium">
                            {typeMeta[data.type as TxType].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{data.initiatedBy}</TableCell>
                      <TableCell>
                        <div
                          className={`font-semibold flex items-center ${
                            data.amount >= 0
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {data.amount >= 0
                            ? `+${BDT.format(data.amount)}`
                            : `${BDT.format(data.amount)}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={data.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(data.createdAt).toLocaleString()}
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
  );
}
