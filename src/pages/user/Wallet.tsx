// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   Send as SendIcon,
//   ReceiptText,
// } from "lucide-react";
// import { toast } from "sonner";
// import WalletHeader from "@/components/modules/user/wallet/WalletHeader";
// import BalanceCard from "@/components/modules/user/wallet/BalanceCard";
// import QuickAmounts from "@/components/modules/user/wallet/QuickAmounts";
// import { txType } from "@/constants/txType";
// import { calculateFee } from "@/utils/claculateFee";
// import { useSearchParams } from "react-router";
// import {
//   useAddMoneyMutation,
//   useSendMoneyMutation,
//   useWithdrawMoneyMutation,
// } from "@/redux/features/transaction/transaction.api";
// import { useGetMeWalletQuery } from "@/redux/features/wallet/wallet.api";
// import DepositFeeSummary from "@/components/modules/user/wallet/DepositFeeSummary";
// import WithdrawFeeSummary from "@/components/modules/user/wallet/WithdrawFeeSummary";
// import SendMoneyFeeSummary from "@/components/modules/user/wallet/SendMoneyFeeSummary";
// import { useGetAllUserAndAgentQuery } from "@/redux/features/user/user.api";
// import { Helmet } from "react-helmet";

// // -------------------- Validation --------------------

// const depositSchema = z.object({
//   amount: z.number().min(50, { error: "Minimum amount 50" }),
//   type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
//     error: "Type is Required",
//   }),
//   email: z.email(),
// });

// const withdrawSchema = z.object({
//   amount: z.number().min(50, { error: "Minimum amount 50" }),
//   type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
//     error: "Type is Required",
//   }),
//   email: z.email(),
// });

// const sendSchema = z.object({
//   amount: z.number().min(50, { error: "Minimum amount 50" }),
//   type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
//     error: "Type is Required",
//   }),
//   email: z.email(),
// });

// // -------------------- Reusable UI --------------------

// function FieldHint({ children }: { children: React.ReactNode }) {
//   return <p className="text-xs text-muted-foreground mt-1">{children}</p>;
// }

// // -------------------- Main Component --------------------
// export default function WalletPage() {
//   const [addMoney] = useAddMoneyMutation();
//   const [withdrawMoney] = useWithdrawMoneyMutation();
//   const [sendMoney] = useSendMoneyMutation();
//   const { data: walletData, isLoading: walletLoading } =
//     useGetMeWalletQuery(undefined);
//   const { data: agentData } = useGetAllUserAndAgentQuery({ user: "agent" });
//   const { data: userData } = useGetAllUserAndAgentQuery({ user: "user" });
//   const [searchParams] = useSearchParams();
//   const tabFromQuery = searchParams.get("tab") || "deposit";
//   const [activeTab, setActiveTab] = useState(tabFromQuery);
//   const [balance, setBalance] = useState<number | undefined>(undefined);
//   useEffect(() => {
//     setActiveTab(tabFromQuery);
//   }, [tabFromQuery]);

//   useEffect(() => {
//     if (walletData?.data?.balance !== undefined) {
//       setBalance(walletData?.data?.balance);
//     }
//   }, [walletData]);
//   // ---- Deposit form ----
//   const depositForm = useForm<z.infer<typeof depositSchema>>({
//     resolver: zodResolver(depositSchema),
//     defaultValues: {
//       amount: 0,
//       email: "",
//       type: "ADD_MONEY",
//     },
//   });

//   // ---- Withdraw form ----
//   const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
//     resolver: zodResolver(withdrawSchema),
//     defaultValues: {
//       amount: 0,
//       email: "",
//       type: "WITHDRAW",
//     },
//   });

//   // ---- Send form ----
//   const sendForm = useForm<z.infer<typeof sendSchema>>({
//     resolver: zodResolver(sendSchema),
//     defaultValues: {
//       amount: 0,
//       email: "",
//       type: "SEND_MONEY",
//     },
//   });

//   // ---- Handlers (replace with RTK Query mutations) ----
//   async function onDeposit(values: z.infer<typeof depositSchema>) {
//     let toastId: string | number | undefined;
//     try {
//       toastId = toast.loading("Processing your deposit...");
//       const res = await addMoney(values).unwrap();
//       if (res?.success) {
//         toast.success("Deposit successfully", { id: toastId });
//         depositForm.reset({ amount: 0, email: "" });
//         setBalance((prev) => (prev ?? 0) + values.amount);
//       } else {
//         toast.error("Deposit failed", { id: toastId });
//       }
//     } catch (error: any) {
//       console.log(error);
//       const message =
//         error?.data?.message || error?.message || "Something went wrong";
//       toast.error(message, { id: toastId });
//       console.log(error);
//     }
//   }

//   async function onWithdraw(values: z.infer<typeof withdrawSchema>) {
//     const { fee, totalAmount } = calculateFee(values.amount, "WITHDRAW");
//     if (totalAmount > (balance ?? 0)) {
//       toast.error("Insufficient balance");
//       return;
//     }
//     let toastId: string | number | undefined;
//     try {
//       toastId = toast.loading("Processing your withdraw...");
//       const withdrawData = {
//         type: values.type,
//         amount: totalAmount,
//         email: values.email,
//         fee: fee,
//       };
//       const res = await withdrawMoney(withdrawData).unwrap();
//       if (res?.success) {
//         toast.success("Withdraw successfully", { id: toastId });
//         withdrawForm.reset({ amount: 0, email: "" });
//         setBalance((prev) => (prev ?? 0) - totalAmount);
//       } else {
//         toast.error("Withdraw failed", { id: toastId });
//       }
//     } catch (error: any) {
//       const message =
//         error?.data?.message || error?.message || "Something went wrong";
//       toast.error(message, { id: toastId });
//       console.log(error);
//     }
//   }

//   async function onSend(values: z.infer<typeof sendSchema>) {
//     const { fee, totalAmount } = calculateFee(values.amount, "SEND_MONEY");
//     if (totalAmount > (balance ?? 0)) {
//       toast.error("Insufficient balance");
//       return;
//     }
//     let toastId: string | number | undefined;
//     try {
//       const sendData = {
//         type: values.type,
//         amount: totalAmount,
//         email: values.email,
//         fee: fee,
//       };
//       toastId = toast.loading("Processing your sendMoney...");
//       const res = await sendMoney(sendData).unwrap();
//       if (res?.success) {
//         toast.success("Sent Money Successfully", { id: toastId });
//         setBalance((amount) => (amount ?? 0) - totalAmount);
//         sendForm.reset({ amount: 0, email: "" });
//       } else {
//         toast.error("Send Money failed", { id: toastId });
//       }
//     } catch (error: any) {
//       const message =
//         error?.data?.message || error?.message || "Something went wrong";
//       toast.error(message, { id: toastId });
//       console.log(error);
//     }
//   }

//   // -------------------- UI --------------------
//   return (
//     <div className="max-w-7xl container mx-auto py-6 space-y-6">
//       <Helmet>
//         <title>NEOPAY - Digital Wallet for NEOPAY</title>
//         <meta name="description" content="This is Wallet Page" />
//       </Helmet>
//       <WalletHeader />

//       <div
//         className="grid grid-cols-1 lg:grid-cols-3 space-y-4 lg:space-y-0 lg:gap-4"
//         data-tour="overview"
//       >
//         <BalanceCard balance={balance} walletLoading={walletLoading} />

//         <Card className="md:col-span-2">
//           <CardHeader className="pb-2">
//             <CardTitle className="flex items-center gap-2 text-xl">
//               <ReceiptText className="h-5 w-5 text-primary" /> Quick Actions
//             </CardTitle>
//             <CardDescription>
//               Pick a preset, then finalize in the form below.{" "}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-3">
//               <QuickAmounts
//                 onPick={(n) => {
//                   // apply to the active tab's amount field
//                   const active = document
//                     .querySelector('[data-active-tab="true"]')
//                     ?.getAttribute("data-value");
//                   if (active === "deposit")
//                     depositForm.setValue("amount", n, {
//                       shouldValidate: true,
//                       shouldDirty: true,
//                     });
//                   if (active === "withdraw")
//                     withdrawForm.setValue("amount", n, {
//                       shouldValidate: true,
//                       shouldDirty: true,
//                     });
//                   if (active === "send")
//                     sendForm.setValue("amount", n, {
//                       shouldValidate: true,
//                       shouldDirty: true,
//                     });
//                 }}
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="w-full"
//         data-tour="tabs"
//       >
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger
//             value="deposit"
//             data-value="deposit"
//             data-active-tab={true}
//             onFocus={(e) => {
//               // mark active
//               document
//                 .querySelectorAll('[role="tab"]')
//                 .forEach((el) => el.setAttribute("data-active-tab", "false"));
//               (e.currentTarget as HTMLElement).setAttribute(
//                 "data-active-tab",
//                 "true"
//               );
//             }}
//             className="gap-2"
//           >
//             <ArrowDownToLine className="h-4 w-4" /> Deposit
//           </TabsTrigger>
//           <TabsTrigger
//             value="withdraw"
//             data-value="withdraw"
//             onFocus={(e) => {
//               document
//                 .querySelectorAll('[role="tab"]')
//                 .forEach((el) => el.setAttribute("data-active-tab", "false"));
//               (e.currentTarget as HTMLElement).setAttribute(
//                 "data-active-tab",
//                 "true"
//               );
//             }}
//             className="gap-2"
//           >
//             <ArrowUpFromLine className="h-4 w-4" /> Withdraw
//           </TabsTrigger>
//           <TabsTrigger
//             value="send"
//             data-value="send"
//             onFocus={(e) => {
//               document
//                 .querySelectorAll('[role="tab"]')
//                 .forEach((el) => el.setAttribute("data-active-tab", "false"));
//               (e.currentTarget as HTMLElement).setAttribute(
//                 "data-active-tab",
//                 "true"
//               );
//             }}
//             className="gap-2"
//           >
//             <SendIcon className="h-4 w-4" /> Send
//           </TabsTrigger>
//         </TabsList>

//         {/* Deposit */}
//         <TabsContent value="deposit">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <ArrowDownToLine className="h-5 w-5 text-primary" /> Deposit
//                 Money
//               </CardTitle>
//               <CardDescription>
//                 Cash-in via Agent, Bank or Card. Instant balance update.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:gap-6">
//               <div className="md:col-span-2 space-y-4">
//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     Payment Type
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       depositForm.setValue("type", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={depositForm.getValues("type")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select Payment Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
//                       <SelectItem value="WITHDRAW">Withdraw</SelectItem>
//                       <SelectItem value="SEND_MONEY">Send Money</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {depositForm.formState.errors.type && (
//                     <p className="text-destructive text-xs mt-1">
//                       {depositForm.formState.errors.type.message?.toString()}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="deposit-amount" className="mb-2">
//                     Amount
//                   </Label>
//                   <Input
//                     id="deposit-amount"
//                     type="number"
//                     inputMode="numeric"
//                     placeholder="e.g. 50"
//                     className="rounded-md w-full"
//                     value={depositForm.watch("amount") || ""}
//                     onChange={(e) =>
//                       depositForm.setValue(
//                         "amount",
//                         Number(e.target.value || 0),
//                         { shouldValidate: true }
//                       )
//                     }
//                   />
//                   {depositForm.formState.errors.amount && (
//                     <p className="text-destructive text-xs mt-1">
//                       {depositForm.formState.errors.amount.message}
//                     </p>
//                   )}
//                   <FieldHint>
//                     Use quick buttons above for common amounts.
//                   </FieldHint>
//                 </div>
//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     Agent Email
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       depositForm.setValue("email", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={depositForm.getValues("email")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select Agent Email" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {agentData?.data?.map((data: any) => (
//                         <SelectItem key={data?.email} value={data?.email}>
//                           {data?.email}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {depositForm.formState.errors.email && (
//                     <p className="text-destructive text-xs mt-1">
//                       {depositForm.formState.errors.email.message?.toString()}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4 ">
//                 <Card className="bg-muted/40">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-base">Summary</CardTitle>
//                     <CardDescription>Estimated fees & totals</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <DepositFeeSummary
//                       amount={depositForm.watch("amount") || 0}
//                       balance={balance}
//                       type={txType.ADD_MONEY as "ADD_MONEY"}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </CardContent>
//             <CardFooter className="flex items-center gap-2 justify-end">
//               <Button
//                 variant="outline"
//                 type="button"
//                 onClick={() => depositForm.reset()}
//               >
//                 Reset
//               </Button>
//               <Button onClick={depositForm.handleSubmit(onDeposit)}>
//                 Deposit Now
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Withdraw */}
//         <TabsContent value="withdraw">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <ArrowUpFromLine className="h-5 w-5 text-primary" /> Withdraw
//                 Money
//               </CardTitle>
//               <CardDescription>
//                 Cash-out to Agent or transfer to Bank account.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="grid  grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:gap-6">
//               <div className="md:col-span-2 space-y-4">
//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     Payment Type
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       withdrawForm.setValue("type", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={withdrawForm.getValues("type")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select Payment Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
//                       <SelectItem value="WITHDRAW">Withdraw</SelectItem>
//                       <SelectItem value="SEND_MONEY">Send Money</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {withdrawForm.formState.errors.type && (
//                     <p className="text-destructive text-xs mt-1">
//                       {withdrawForm.formState.errors.type.message?.toString()}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="withdraw-amount" className="mb-2">
//                     Amount
//                   </Label>
//                   <Input
//                     id="withdraw-amount"
//                     type="number"
//                     inputMode="numeric"
//                     placeholder="e.g. 50"
//                     className="rounded-md"
//                     value={withdrawForm.watch("amount") || ""}
//                     onChange={(e) =>
//                       withdrawForm.setValue(
//                         "amount",
//                         Number(e.target.value || 0),
//                         { shouldValidate: true }
//                       )
//                     }
//                   />
//                   {withdrawForm.formState.errors.amount && (
//                     <p className="text-destructive text-xs mt-1">
//                       {withdrawForm.formState.errors.amount.message}
//                     </p>
//                   )}
//                   <FieldHint>
//                     Fees apply. Ensure agent availability before cash-out.
//                   </FieldHint>
//                 </div>

//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     Agent Email
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       withdrawForm.setValue("email", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={withdrawForm.getValues("email")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select Agent Email" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {agentData?.data?.map((data: any) => (
//                         <SelectItem key={data?.email} value={data?.email}>
//                           {data?.email}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {withdrawForm.formState.errors.email && (
//                     <p className="text-destructive text-xs mt-1">
//                       {withdrawForm.formState.errors.email.message?.toString()}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <Card className="bg-muted/40">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-base">Summary</CardTitle>
//                     <CardDescription>Total including fee</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <WithdrawFeeSummary
//                       amount={withdrawForm.watch("amount") || 0}
//                       balance={balance}
//                       type={txType.WITHDRAW as "WITHDRAW"}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </CardContent>
//             <CardFooter className="flex items-center gap-2 justify-end">
//               <Button
//                 variant="outline"
//                 type="button"
//                 onClick={() => withdrawForm.reset()}
//               >
//                 Reset
//               </Button>
//               <Button onClick={withdrawForm.handleSubmit(onWithdraw)}>
//                 Withdraw
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Send */}
//         <TabsContent value="send">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <SendIcon className="h-5 w-5 text-primary" /> Send Money
//               </CardTitle>
//               <CardDescription>
//                 Transfer to another wallet using phone or email.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:gap-6">
//               <div className="md:col-span-2 space-y-4">
//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     Payment Type
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       sendForm.setValue("type", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={sendForm.getValues("type")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select Payment Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
//                       <SelectItem value="WITHDRAW">Withdraw</SelectItem>
//                       <SelectItem value="SEND_MONEY">Send Money</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {sendForm.formState.errors.type && (
//                     <p className="text-destructive text-xs mt-1">
//                       {sendForm.formState.errors.type.message?.toString()}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="send-amount" className="mb-2">
//                     Amount
//                   </Label>
//                   <Input
//                     id="send-amount"
//                     type="number"
//                     inputMode="numeric"
//                     placeholder="e.g. 750"
//                     className="rounded-md"
//                     value={sendForm.watch("amount") || ""}
//                     onChange={(e) =>
//                       sendForm.setValue("amount", Number(e.target.value || 0), {
//                         shouldValidate: true,
//                       })
//                     }
//                   />
//                   {sendForm.formState.errors.amount && (
//                     <p className="text-destructive text-xs mt-1">
//                       {sendForm.formState.errors.amount.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="deposit-method" className="mb-2">
//                     User Email
//                   </Label>
//                   <Select
//                     onValueChange={(v) =>
//                       sendForm.setValue("email", v as any, {
//                         shouldValidate: true,
//                       })
//                     }
//                     defaultValue={sendForm.getValues("email")}
//                   >
//                     <SelectTrigger
//                       id="deposit-method"
//                       className="rounded-md w-full"
//                     >
//                       <SelectValue placeholder="Select User Email" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {userData?.data?.map((data: any) => (
//                         <SelectItem key={data?.email} value={data?.email}>
//                           {data?.email}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {sendForm.formState.errors.email && (
//                     <p className="text-destructive text-xs mt-1">
//                       {sendForm.formState.errors.email.message?.toString()}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <Card className="bg-muted/40">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-base">Summary</CardTitle>
//                     <CardDescription>Includes network fee</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <SendMoneyFeeSummary
//                       amount={sendForm.watch("amount") || 0}
//                       balance={balance}
//                       type={txType.SEND_MONEY as "SEND_MONEY"}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </CardContent>
//             <CardFooter className="flex items-center gap-2 justify-end">
//               <Button
//                 variant="outline"
//                 type="button"
//                 onClick={() => sendForm.reset()}
//               >
//                 Reset
//               </Button>
//               <Button onClick={sendForm.handleSubmit(onSend)}>
//                 Send Money
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" data-tour="info">
//         <Card className="bg-muted/40">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base">Security</CardTitle>
//           </CardHeader>
//           <CardContent className="text-sm text-muted-foreground">
//             End-to-end encryption, device binding, OTP & behavioral risk checks.
//           </CardContent>
//         </Card>
//         <Card className="bg-muted/40">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base">Support</CardTitle>
//           </CardHeader>
//           <CardContent className="text-sm text-muted-foreground">
//             24/7 chat • Dispute resolution • Refund flows for failed transfers.
//           </CardContent>
//         </Card>
//         <Card className="bg-muted/40">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base">Compliance</CardTitle>
//           </CardHeader>
//           <CardContent className="text-sm text-muted-foreground">
//             KYC/AML aligned. Limits & fees configurable from Admin panel.
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send as SendIcon,
  ReceiptText,
  Wallet,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import BalanceCard from "@/components/modules/user/wallet/BalanceCard";

import { calculateFee } from "@/utils/claculateFee";
import { useSearchParams } from "react-router";
import {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/redux/features/transaction/transaction.api";
import { useGetMeWalletQuery } from "@/redux/features/wallet/wallet.api";
import DepositFeeSummary from "@/components/modules/user/wallet/DepositFeeSummary";
import WithdrawFeeSummary from "@/components/modules/user/wallet/WithdrawFeeSummary";
import SendMoneyFeeSummary from "@/components/modules/user/wallet/SendMoneyFeeSummary";
import { useGetAllUserAndAgentQuery } from "@/redux/features/user/user.api";
import { Helmet } from "react-helmet";
import { WalletHeader } from "@/components/modules/user/wallet/WalletHeader";
import { QuickAmounts } from "@/components/modules/user/wallet/QuickAmounts";

// -------------------- Validation --------------------
const depositSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  email: z.email(),
});

const withdrawSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  email: z.email(),
});

const sendSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  email: z.email(),
});

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-muted-foreground mt-1.5 flex items-center gap-1">
      <Zap className="h-3 w-3 text-primary" /> {children}
    </p>
  );
}

export default function WalletPage() {
  const [addMoney] = useAddMoneyMutation();
  const [withdrawMoney] = useWithdrawMoneyMutation();
  const [sendMoney] = useSendMoneyMutation();
  const { data: walletData, isLoading: walletLoading } =
    useGetMeWalletQuery(undefined);
  const { data: agentData } = useGetAllUserAndAgentQuery({ user: "agent" });
  const { data: userData } = useGetAllUserAndAgentQuery({ user: "user" });
  const [searchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab") || "deposit";
  const [activeTab, setActiveTab] = useState(tabFromQuery);
  const [balance, setBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    setActiveTab(tabFromQuery);
  }, [tabFromQuery]);

  useEffect(() => {
    if (walletData?.data?.balance !== undefined) {
      setBalance(walletData?.data?.balance);
    }
  }, [walletData]);

  // Forms
  const depositForm = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: 0, email: "", type: "ADD_MONEY" },
  });

  const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, email: "", type: "WITHDRAW" },
  });

  const sendForm = useForm<z.infer<typeof sendSchema>>({
    resolver: zodResolver(sendSchema),
    defaultValues: { amount: 0, email: "", type: "SEND_MONEY" },
  });

  // Handlers
  async function onDeposit(values: z.infer<typeof depositSchema>) {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing deposit...");
      const res = await addMoney(values).unwrap();
      if (res?.success) {
        toast.success("Deposit successful", { id: toastId });
        depositForm.reset({ amount: 0, email: "" });
        setBalance((prev) => (prev ?? 0) + values.amount);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  async function onWithdraw(values: z.infer<typeof withdrawSchema>) {
    const { fee, totalAmount } = calculateFee(values.amount, "WITHDRAW");
    if (totalAmount > (balance ?? 0))
      return toast.error("Insufficient balance");
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing withdraw...");
      const res = await withdrawMoney({
        ...values,
        amount: totalAmount,
        fee,
      }).unwrap();
      if (res?.success) {
        toast.success("Withdraw successful", { id: toastId });
        withdrawForm.reset({ amount: 0, email: "" });
        setBalance((prev) => (prev ?? 0) - totalAmount);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  async function onSend(values: z.infer<typeof sendSchema>) {
    const { totalAmount } = calculateFee(values.amount, "SEND_MONEY");
    if (totalAmount > (balance ?? 0))
      return toast.error("Insufficient balance");
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Transferring money...");
      const res = await sendMoney({ ...values, amount: totalAmount }).unwrap();
      if (res?.success) {
        toast.success("Sent Money Successfully", { id: toastId });
        setBalance((prev) => (prev ?? 0) - totalAmount);
        sendForm.reset({ amount: 0, email: "" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>Wallet | NEOPAY</title>
      </Helmet>

      <WalletHeader />

      {/* Top Section: Balance & Quick Amounts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 h-full">
          <BalanceCard balance={balance} walletLoading={walletLoading} />
        </div>

        <Card className="lg:col-span-8 border-none shadow-none shadow-primary/5 bg-gradient-to-br from-card to-secondary/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <ReceiptText className="h-5 w-5 text-primary" />
              </div>
              Select Quick Amount
            </CardTitle>
            <CardDescription className="font-medium text-muted-foreground">
              Choose a preset amount to speed up your transaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuickAmounts
              onPick={(n: any) => {
                if (activeTab === "deposit")
                  depositForm.setValue("amount", n, { shouldValidate: true });
                if (activeTab === "withdraw")
                  withdrawForm.setValue("amount", n, { shouldValidate: true });
                if (activeTab === "send")
                  sendForm.setValue("amount", n, { shouldValidate: true });
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Selection */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 h-16 p-1.5 bg-muted/60 rounded-2xl border border-border/50 shadow-inner">
          <TabsTrigger
            value="deposit"
            className="rounded-xl font-bold text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <ArrowDownToLine className="h-4 w-4 mr-2 hidden sm:block" /> Deposit
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            className="rounded-xl font-bold text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <ArrowUpFromLine className="h-4 w-4 mr-2 hidden sm:block" />{" "}
            Withdraw
          </TabsTrigger>
          <TabsTrigger
            value="send"
            className="rounded-xl font-bold text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <SendIcon className="h-4 w-4 mr-2 hidden sm:block" /> Send
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Deposit Form */}
            <TabsContent value="deposit" className="mt-0 outline-none">
              <TransactionFormLayout
                title="Deposit Money"
                description="Instant cash-in from Bank, Card or Agent."
                form={depositForm}
                onSubmit={onDeposit}
                tab="deposit"
                agentData={agentData}
                balance={balance}
                submitLabel="Add Money"
              />
            </TabsContent>

            {/* Withdraw Form */}
            <TabsContent value="withdraw" className="mt-0 outline-none">
              <TransactionFormLayout
                title="Withdraw Money"
                description="Securely cash-out to any verified agent."
                form={withdrawForm}
                onSubmit={onWithdraw}
                tab="withdraw"
                agentData={agentData}
                balance={balance}
                submitLabel="Withdraw"
              />
            </TabsContent>

            {/* Send Money Form */}
            <TabsContent value="send" className="mt-0 outline-none">
              <TransactionFormLayout
                title="Send Money"
                description="Instant peer-to-peer wallet transfer."
                form={sendForm}
                onSubmit={onSend}
                tab="send"
                agentData={userData} // Use userData for send money
                balance={balance}
                submitLabel="Transfer Now"
              />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Info Cards Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Security",
            desc: "Multi-layer encryption & OTP protected transactions.",
            icon: <ShieldCheck className="text-primary" />,
          },
          {
            title: "Support",
            desc: "Dedicated 24/7 help desk for all wallet issues.",
            icon: <Zap className="text-primary" />,
          },
          {
            title: "Compliance",
            desc: "Fully compliant with AML/KYC regulations.",
            icon: <ReceiptText className="text-primary" />,
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-card hover:border-primary/50 transition-all group border-border/60"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-3">
              <div className="p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                {item.icon}
              </div>
              <CardTitle className="text-sm font-black uppercase tracking-widest">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground font-medium leading-relaxed">
              {item.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// -------------------- Reusable Layout Component --------------------

function TransactionFormLayout({
  title,
  form,
  onSubmit,
  tab,
  agentData,
  balance,
  submitLabel,
}: any) {
  return (
    <Card className="border-border/50 shadow-none shadow-black/[0.02] rounded-3xl overflow-hidden">
      <div className="bg-primary/5 px-6 py-5 border-b border-border/40 flex items-center justify-between">
        <CardTitle className="text-xl  capitalize flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <Badge
          variant="outline"
          className="bg-background text-primary border-primary/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1"
        >
          Secure
        </Badge>
      </div>

      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Amount Field */}
          <div className="space-y-3">
            <Label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">
              Transaction Amount
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-muted-foreground group-focus-within:text-primary transition-colors">
                ৳
              </div>
              <Input
                type="number"
                className="h-16 rounded-2xl text-2xl font-black pl-12 border-border/60 focus-visible:ring-primary/20 bg-muted/20"
                placeholder="0.00"
                {...form.register("amount", { valueAsNumber: true })}
              />
            </div>
            {form.formState.errors.amount && (
              <p className="text-destructive text-xs font-bold mt-1 ml-1">
                {form.formState.errors.amount.message}
              </p>
            )}
            <FieldHint>Minimum amount is BDT 50.00</FieldHint>
          </div>

          {/* Email/Agent Field */}
          <div className="space-y-3">
            <Label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">
              {tab === "send" ? "Recipient Email" : "Agent Email"}
            </Label>
            <Select
              onValueChange={(v) =>
                form.setValue("email", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-14 rounded-2xl border-border/60 focus:ring-primary/20 bg-muted/20 font-semibold w-full">
                <SelectValue
                  placeholder={`Select ${
                    tab === "send" ? "User" : "Agent"
                  } Email`}
                />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {agentData?.data?.map((u: any) => (
                  <SelectItem
                    key={u.email}
                    value={u.email}
                    className="rounded-lg font-medium"
                  >
                    {u.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.email && (
              <p className="text-destructive text-xs font-bold mt-1 ml-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 h-full">
          <Card className="bg-muted/40 border-none rounded-3xl h-full shadow-inner">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ReceiptText className="w-4 h-4 text-primary" /> Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tab === "deposit" && (
                <DepositFeeSummary
                  amount={form.watch("amount") || 0}
                  balance={balance}
                  type="ADD_MONEY"
                />
              )}
              {tab === "withdraw" && (
                <WithdrawFeeSummary
                  amount={form.watch("amount") || 0}
                  balance={balance}
                  type="WITHDRAW"
                />
              )}
              {tab === "send" && (
                <SendMoneyFeeSummary
                  amount={form.watch("amount") || 0}
                  balance={balance}
                  type="SEND_MONEY"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 px-6 py-5 flex justify-end gap-4 border-t border-border/40">
        <Button
          variant="ghost"
          className="rounded-xl font-bold px-6"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button
          className="rounded-xl px-10 h-10 font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          onClick={form.handleSubmit(onSubmit)}
        >
          {submitLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

// -------------------- Sub-Components with Design Updates --------------------

const Badge = ({ children, className }: any) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}
  >
    {children}
  </span>
);
