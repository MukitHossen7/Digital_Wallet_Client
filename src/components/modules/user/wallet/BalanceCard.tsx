import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck } from "lucide-react";

interface IProps {
  balance: number | undefined;
  walletLoading?: boolean;
}

const BalanceCard = ({ balance, walletLoading }: IProps) => {
  return (
    <Card className="border-dashed" data-tour="balance">
      <CardHeader className="pb-2">
        <CardDescription>Current Balance</CardDescription>
        <CardTitle className="text-3xl">
          {walletLoading ? (
            <Skeleton className="h-9 w-40" />
          ) : (
            <span>BDT {balance}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Protected by device binding & OTP</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
