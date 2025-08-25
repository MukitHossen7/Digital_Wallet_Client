import { TxStatus } from "@/pages/user/TransactionHistory";

export const statusMeta: Record<
  TxStatus,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  COMPLETED: { label: "Success", variant: "default" },
  PENDING: { label: "Pending", variant: "secondary" },
  FAILED: { label: "Failed", variant: "destructive" },
};
