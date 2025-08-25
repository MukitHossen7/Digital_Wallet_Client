import { TxStatus } from "@/pages/user/TransactionHistory";
import { statusMeta } from "./statusMeta";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Timer, XCircle } from "lucide-react";

const StatusBadge = ({ status }: { status: TxStatus }) => {
  const meta = statusMeta[status];
  return (
    <Badge variant={meta.variant} className="gap-1 rounded-xl">
      {status === "COMPLETED" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {status === "PENDING" && <Timer className="h-3.5 w-3.5" />}
      {status === "FAILED" && <XCircle className="h-3.5 w-3.5" />}
      {meta.label}
    </Badge>
  );
};

export default StatusBadge;
