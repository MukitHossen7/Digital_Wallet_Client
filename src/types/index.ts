import { ComponentType } from "react";
import { IconType } from "react-icons";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
export type TRole = "ADMIN" | "USER" | "AGENT";

export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    icon?: IconType;
  }[];
}

export type {
  ILogin,
  IRegisterData,
  IRegister,
  ISendOTP,
  IVerifyOTP,
  IUpdateProfile,
} from "./auth.type";

export type {
  IAddMoney,
  IWithdrawMoney,
  ISendMoney,
  ICashIn,
  ICashOut,
} from "./transaction.type";
