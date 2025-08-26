export interface IAddMoney {
  amount: number;
  type: string;
  email: string;
}

export interface IWithdrawMoney {
  amount: number;
  type: string;
  email: string;
  fee: number;
}
export interface ISendMoney {
  amount: number;
  type: string;
  email: string;
}
