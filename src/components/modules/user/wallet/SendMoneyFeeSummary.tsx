import { Separator } from "@/components/ui/separator";
import { calculateFee } from "@/utils/claculateFee";
import { useMemo } from "react";

interface IProps {
  amount: number;
  balance: number | undefined;
  type: "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
}

const SendMoneyFeeSummary = ({ amount, balance = 0, type }: IProps) => {
  const { fee, totalAmount } = useMemo(
    () => calculateFee(amount, type),
    [amount, type]
  );
  const canAfford = totalAmount <= balance;
  return (
    <div className="space-y-2 text-sm" data-tour="fee-summary">
      <div className="flex justify-between">
        <span>Amount</span>
        <span>BDT {amount || 0}</span>
      </div>

      <div className="flex justify-between">
        <span>Fee</span>
        <span>BDT {amount ? fee : 0}</span>
      </div>

      <Separator />

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>BDT {amount ? totalAmount : 0}</span>
      </div>

      <div className="flex justify-between text-muted-foreground">
        <span>New balance</span>
        <span>BDT {amount ? balance - totalAmount : balance}</span>
      </div>

      {!canAfford && amount > 0 && (
        <p className="text-destructive text-xs">
          Insufficient balance for this amount including fee.
        </p>
      )}
    </div>
  );
};

export default SendMoneyFeeSummary;
