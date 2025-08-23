export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export type {
  ILogin,
  IRegisterData,
  IRegister,
  ISendOTP,
  IVerifyOTP,
} from "./auth.type";
