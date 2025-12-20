// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   Send,
//   ListFilter,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";
// import EmptyState from "@/components/modules/user/transaction/EmptyState";
// import StatusBadge from "@/components/modules/user/transaction/StatusBadge";
// import { useGetMeTransactionQuery } from "@/redux/features/transaction/transaction.api";
// import { Helmet } from "react-helmet";
// import DateComponent from "@/components/date-component";

// export type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
// export type TxStatus = "COMPLETED" | "PENDING" | "FAILED";
// export interface TxItem {
//   id: string;
//   type: TxType;
//   initiatedBy?: string;
//   amount: number;
//   status: TxStatus;
//   createdAt: string;
// }

// const BDT = new Intl.NumberFormat("en-BD", {
//   style: "currency",
//   currency: "BDT",
// });
// const formatBDT = (n: number) => {
//   try {
//     return BDT.format(n);
//   } catch {
//     return `৳${n.toLocaleString("en-BD", { maximumFractionDigits: 2 })}`;
//   }
// };

// const typeMeta: Record<
//   TxType,
//   { label: string; color: string; icon: React.ReactNode }
// > = {
//   ADD_MONEY: {
//     label: "Deposit",
//     color: "text-emerald-600",
//     icon: <ArrowDownToLine className="h-4 w-4" />,
//   },
//   WITHDRAW: {
//     label: "Withdraw",
//     color: "text-rose-600",
//     icon: <ArrowUpFromLine className="h-4 w-4" />,
//   },
//   SEND_MONEY: {
//     label: "Send Money",
//     color: "text-blue-600",
//     icon: <Send className="h-4 w-4" />,
//   },
// };

// export default function TransactionHistory() {
//   // filters
//   const [type, setType] = useState<"all" | TxType>("all");
//   const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
//   const [to, setTo] = useState<string>("");
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);

//   const { data: transactionData, isLoading } = useGetMeTransactionQuery({
//     page: page,
//     limit: pageSize,
//     type: type,
//     fromDate: from,
//     toDate: to,
//   });

//   useEffect(() => {
//     setPage(1);
//   }, [type, from, to, pageSize]);

//   // backend  data
//   const tx = useMemo(() => transactionData?.data ?? [], [transactionData]);

//   const total = transactionData?.meta.total ?? 0;
//   const totalPages = transactionData?.meta.totalPage ?? 1;
//   const start = (page - 1) * pageSize;
//   const end = Math.min(start + pageSize, total);
//   const pageItems = tx;
//   return (
//     <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
//       <Helmet>
//         <title>NEOPAY - Digital Wallet for NEOPAY</title>
//         <meta name="description" content="This is Transactions Page" />
//       </Helmet>
//       {/* Header */}
//       <div className="flex items-start justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
//             Transaction History
//           </h1>
//           <p className="text-muted-foreground">
//             View and manage all your transactions
//           </p>
//         </div>
//         <Badge variant="secondary" className="rounded-xl">
//           History
//         </Badge>
//       </div>

//       {/* Filters */}
//       <Card data-tour="filters">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-lg flex items-center gap-2">
//             <ListFilter className="h-5 w-5" /> Filters
//           </CardTitle>
//           <CardDescription>
//             Refine your transaction list by type and date window.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col  lg:flex-row gap-4">
//             <div className="w-full mt-1">
//               <Label>Type</Label>
//               <Select
//                 defaultValue={type}
//                 onValueChange={(v) => setType(v as any)}
//               >
//                 <SelectTrigger className="rounded-md mt-1 w-full">
//                   <SelectValue placeholder="All" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   <SelectItem value="ADD_MONEY">Deposit</SelectItem>
//                   <SelectItem value="WITHDRAW">Withdraw</SelectItem>
//                   <SelectItem value="SEND_MONEY">Send Money</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="w-full">
//               <DateComponent label="From" value={from} onChange={setFrom} />
//             </div>
//             <div className="w-full">
//               <DateComponent label="To" value={to} onChange={setTo} />
//             </div>
//           </div>

//           <div className="mt-4 flex flex-wrap items-center gap-2">
//             <Button
//               variant="outline"
//               className=""
//               onClick={() => {
//                 setType("all");
//                 setFrom("");
//                 setTo("");
//               }}
//             >
//               Reset
//             </Button>
//             <Separator orientation="vertical" className="h-8" />
//             <div className="text-sm text-muted-foreground">
//               Showing <span className="font-medium">{total}</span> results
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <Card className="overflow-x-auto">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-lg">Transactions</CardTitle>
//           <CardDescription>All activities in your wallet</CardDescription>
//         </CardHeader>
//         <CardContent className="pt-0">
//           {isLoading ? (
//             <div className="space-y-2 py-4">
//               {Array.from({ length: 10 }).map((_, i) => (
//                 <Card key={i} className="p-3">
//                   <Skeleton className="h-6 w-full" />
//                 </Card>
//               ))}
//             </div>
//           ) : pageItems.length > 0 ? (
//             <>
//               <div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Type</TableHead>
//                       <TableHead>InitiatedBy</TableHead>
//                       <TableHead className="text-right">Amount</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">
//                         Transaction Date
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {pageItems.map((t: any, idx: any) => (
//                       <TableRow key={idx} className="hover:bg-muted/50">
//                         <TableCell>
//                           <div
//                             className={`inline-flex items-center gap-2 ${
//                               typeMeta[t.type as TxType].color
//                             }`}
//                           >
//                             {typeMeta[t.type as TxType].icon}
//                             <span className="font-medium">
//                               {typeMeta[t.type as TxType].label}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {t.initiatedBy ?? "—"}
//                         </TableCell>
//                         <TableCell
//                           className={`text-right font-semibold ${
//                             t.amount >= 0 ? "text-emerald-600" : "text-rose-600"
//                           }`}
//                         >
//                           {t.amount >= 0
//                             ? `+${formatBDT(t.amount)}`
//                             : `${formatBDT(t.amount)}`}
//                         </TableCell>
//                         <TableCell>
//                           <StatusBadge status={t.status} />
//                         </TableCell>
//                         <TableCell className="text-muted-foreground text-right">
//                           {new Date(t.createdAt).toLocaleString()}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator className="my-4" />

//               {/* Pagination */}
//               <div className="flex flex-wrap items-center justify-between gap-3">
//                 <div className="text-sm text-muted-foreground">
//                   Showing <span className="font-medium">{start + 1}</span>–
//                   <span className="font-medium">{end}</span> of{" "}
//                   <span className="font-medium">{total}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full"
//                       onClick={() => setPage(1)}
//                       disabled={page === 1}
//                     >
//                       <ChevronsLeft className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full"
//                       onClick={() => setPage((p) => Math.max(1, p - 1))}
//                       disabled={page === 1}
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                     </Button>
//                     <div className="px-3 text-sm">
//                       Page <span className="font-medium">{page}</span> /{" "}
//                       {totalPages}
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full"
//                       onClick={() =>
//                         setPage((p) => Math.min(totalPages, p + 1))
//                       }
//                       disabled={page === totalPages}
//                     >
//                       <ChevronRight className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8 rounded-full"
//                       onClick={() => setPage(totalPages)}
//                       disabled={page === totalPages}
//                     >
//                       <ChevronsRight className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <EmptyState />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  History,
  CalendarDays,
} from "lucide-react";
import EmptyState from "@/components/modules/user/transaction/EmptyState";
import StatusBadge from "@/components/modules/user/transaction/StatusBadge";
import { useGetMeTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";
import DateComponent from "@/components/date-component";

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
  { label: string; color: string; icon: React.ReactNode; bg: string }
> = {
  ADD_MONEY: {
    label: "Deposit",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: <ArrowDownToLine className="h-4 w-4" />,
  },
  WITHDRAW: {
    label: "Withdraw",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-100 dark:bg-rose-900/30",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  SEND_MONEY: {
    label: "Send Money",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: <Send className="h-4 w-4" />,
  },
};

export default function TransactionHistory() {
  const [type, setType] = useState<"all" | TxType>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

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

  const tx = useMemo(() => transactionData?.data ?? [], [transactionData]);
  const total = transactionData?.meta.total ?? 0;
  const totalPages = transactionData?.meta.totalPage ?? 1;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = tx;

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8  animate-in fade-in duration-700">
      <Helmet>
        <title>Transaction History | NEOPAY</title>
        <meta
          name="description"
          content="Manage your NeoPay transaction history"
        />
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-transparent to-transparent p-6 rounded-2xl border border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <History className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Transaction <span className="text-primary">History</span>
            </h1>
          </div>
          <p className="text-muted-foreground font-medium">
            Monitor and export your wallet activities easily.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit h-6 px-4 rounded-full border-primary/20 bg-primary/5 text-primary font-bold uppercase tracking-widest text-[10px]"
        >
          Live Updates Enabled
        </Badge>
      </div>

      {/* Filters Card */}
      <Card
        className="border-none shadow-none shadow-black/5 bg-card/60 backdrop-blur-md overflow-hidden"
        data-tour="filters"
      >
        <div className="h-1.5 w-full bg-primary" />
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-primary" /> Filter Transactions
          </CardTitle>
          <CardDescription className="font-medium">
            Find specific transactions by selecting type or date range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Type
              </Label>
              <Select
                defaultValue={type}
                onValueChange={(v) => setType(v as any)}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-border/60 hover:border-primary/50 transition-colors focus:ring-primary/20">
                  <SelectValue placeholder="All Activities" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="ADD_MONEY">Deposit (Add Money)</SelectItem>
                  <SelectItem value="WITHDRAW">Withdraw (Cash Out)</SelectItem>
                  <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                From Date
              </Label>
              <DateComponent label="" value={from} onChange={setFrom} />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                To Date
              </Label>
              <DateComponent label="" value={to} onChange={setTo} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-9 px-4 rounded-full font-bold text-xs uppercase text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                onClick={() => {
                  setType("all");
                  setFrom("");
                  setTo("");
                }}
              >
                Clear Filters
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/40">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-muted-foreground">
                  <span className="text-foreground">{total}</span> Results Found
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table Section */}
      <Card className="border-none shadow-none shadow-black/[0.03] overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
              </div>
            ) : pageItems.length > 0 ? (
              <>
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-b border-border/40">
                      <TableHead className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest">
                        Activity Type
                      </TableHead>
                      <TableHead className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest hidden sm:table-cell">
                        Details
                      </TableHead>
                      <TableHead className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest text-right">
                        Amount
                      </TableHead>
                      <TableHead className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest">
                        Status
                      </TableHead>
                      <TableHead className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest text-right hidden lg:table-cell">
                        Date & Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageItems.map((t: any, idx: any) => (
                      <TableRow
                        key={idx}
                        className="group hover:bg-muted/20 border-b border-border/40 transition-colors"
                      >
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                                typeMeta[t.type as TxType].bg
                              } ${typeMeta[t.type as TxType].color}`}
                            >
                              {typeMeta[t.type as TxType].icon}
                            </div>
                            <div>
                              <p className="font-bold text-sm tracking-tight">
                                {typeMeta[t.type as TxType].label}
                              </p>
                              <p className="text-[10px] md:hidden text-muted-foreground mt-0.5">
                                {new Date(t.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 hidden sm:table-cell">
                          <span className="text-sm font-medium text-muted-foreground tracking-tight">
                            {t.initiatedBy ?? "System Activity"}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                          <span
                            className={`text-sm font-black tabular-nums tracking-tighter ${
                              t.amount >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {t.amount >= 0
                              ? `+${formatBDT(t.amount)}`
                              : formatBDT(t.amount)}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <StatusBadge status={t.status} />
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right hidden lg:table-cell">
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-foreground">
                              {new Date(t.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase">
                              {new Date(t.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination Section */}
                <div className="p-6 bg-muted/10 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-muted-foreground">
                      Showing{" "}
                      <span className="text-foreground font-bold">
                        {start + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-foreground font-bold">{end}</span>{" "}
                      of{" "}
                      <span className="text-foreground font-bold">{total}</span>{" "}
                      records
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-background p-1 rounded-2xl border border-border shadow-none">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="px-4 text-xs font-black uppercase tracking-widest text-primary">
                      Page {page} of {totalPages}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
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
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 animate-in zoom-in-95 duration-500">
                <EmptyState />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
