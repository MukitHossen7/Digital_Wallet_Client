import { Badge } from "@/components/ui/badge";
import { Sparkles, Wallet } from "lucide-react";

const WalletHeader = () => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2" data-tour="title">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-1 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Fast • Secure • Reliable</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Wallet className="h-7 w-7 text-primary" /> Wallet
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Manage your wallet balance and transactions.
        </p>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <Badge className="rounded-full text-green-500 bg-green-200">
          Active
        </Badge>
      </div>
    </div>
  );
};

export default WalletHeader;
