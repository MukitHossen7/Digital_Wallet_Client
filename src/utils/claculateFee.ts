type TxType = "ADD_MONEY" | "WITHDRAW" | "SEND_MONEY";
export const calculateFee = (amount: number, type: TxType) => {
  let fee = 0;

  if (type === "WITHDRAW") {
    fee = amount >= 1000 ? 10 : 0;
  }

  if (type === "SEND_MONEY") {
    fee = 5;
  }
  return {
    fee,
    totalAmount: amount + fee,
  };
};
