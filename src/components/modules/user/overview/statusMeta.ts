import { TxStatus } from "@/pages/user/Overview";

export const statusMeta: Record<
  TxStatus,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  COMPLETED: { label: "Success", variant: "default" },
  PENDING: { label: "Pending", variant: "secondary" },
  FAILED: { label: "Failed", variant: "destructive" },
  REVERSED: { label: "Failed", variant: "destructive" },
};
