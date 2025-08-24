import { ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
export type TRole = "ADMIN" | "USER" | "AGENT";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type {
  ILogin,
  IRegisterData,
  IRegister,
  ISendOTP,
  IVerifyOTP,
} from "./auth.type";
