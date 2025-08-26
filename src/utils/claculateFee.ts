type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export const calculateFee = (amount: number, type: TxType) => {
  let fee = 0;

  if (type === "WITHDRAW") {
    const feePerThousand = 10;
    fee = Math.floor((amount / 1000) * feePerThousand);
  }

  if (type === "SEND_MONEY") {
    if (amount < 1000) {
      fee = 0;
    } else {
      fee = 5;
    }
  }
  return {
    fee,
    totalAmount: amount + fee,
  };
};
