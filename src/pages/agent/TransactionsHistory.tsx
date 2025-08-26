import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, FileText, RefreshCw } from "lucide-react";

type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
type TxStatus = "COMPLETED" | "PENDING" | "FAILED";

interface Transaction {
  id: string;
  type: TxType;
  title: string;
  amount: number;
  status: TxStatus;
  createdAt: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_001",
    type: "ADD_MONEY",
    title: "Cash-in via Agent #101",
    amount: 2500,
    status: "COMPLETED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_002",
    type: "WITHDRAW",
    title: "Cash-out to User #202",
    amount: -1500,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_003",
    type: "SEND_MONEY",
    title: "Sent to Rahim",
    amount: -1200,
    status: "FAILED",
    createdAt: new Date().toISOString(),
  },
  // ...add more mock data
];

const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
});

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const getStatusColor = (status: TxStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "FAILED":
        return "bg-rose-100 text-rose-700";
    }
  };

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
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-muted-foreground rounded-md">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted-foreground">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/20">
                      <td className="px-4 py-2">{tx.id}</td>
                      <td className="px-4 py-2 capitalize">{tx.type}</td>
                      <td className="px-4 py-2">{tx.title}</td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          tx.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {tx.amount >= 0
                          ? `+${BDT.format(tx.amount)}`
                          : `${BDT.format(tx.amount)}`}
                      </td>
                      <td className="px-4 py-2">
                        <Badge className={getStatusColor(tx.status)}>
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Pagination placeholder */}
      <div className="flex justify-end gap-2 text-sm text-muted-foreground">
        <button className="btn btn-outline px-3">Prev</button>
        <button className="btn btn-outline px-3">Next</button>
      </div>
    </div>
  );
}
