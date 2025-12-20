/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Sparkles,
  Wallet,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { MdCreditCard } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateFee } from "@/utils/claculateFee";
import { useGetAllUserAndAgentQuery } from "@/redux/features/user/user.api";
import { useGetMeWalletQuery } from "@/redux/features/wallet/wallet.api";
import {
  useAgentCashInMutation,
  useAgentCashOutMutation,
} from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Badge } from "@/components/ui/badge";

const baseSchema = z.object({
  identifier: z.string().min(5, "Enter email of the user"),
  amount: z
    .number({ error: "Amount is required" })
    .positive("Enter a positive amount")
    .max(200000, "Maximum ৳200,000"),
  type: z.enum(["ADD_MONEY", "WITHDRAW"], {
    error: "Type is Required",
  }),
});

type ActionForm = z.infer<typeof baseSchema>;
type UserType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
};

export default function AgentWallet() {
  const { data: userData, isLoading: userLoading } = useGetAllUserAndAgentQuery(
    { user: "user" }
  );
  const { data: walletData } = useGetMeWalletQuery(undefined);
  const [agentCashIn] = useAgentCashInMutation();
  const [agentCashOut] = useAgentCashOutMutation();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [agentBalance, setAgentBalance] = useState<number>(0);

  const depositForm = useForm<ActionForm>({
    resolver: zodResolver(baseSchema),
    defaultValues: { identifier: "", amount: 0, type: "ADD_MONEY" },
    mode: "onChange",
  });

  const withdrawForm = useForm<ActionForm>({
    resolver: zodResolver(baseSchema),
    defaultValues: { identifier: "", amount: 0, type: "WITHDRAW" },
    mode: "onChange",
  });

  const [suggestions, setSuggestions] = useState<typeof users>([]);

  useEffect(() => {
    if (userData?.data) {
      setUsers(userData.data);
    }
  }, [userData]);

  useEffect(() => {
    if (walletData?.data?.balance !== undefined) {
      setAgentBalance(walletData?.data?.balance);
    }
  }, [walletData]);

  useEffect(() => {
    const subDep = depositForm.watch((val, { name }) => {
      if (name === "identifier") onIdentifierChange(val.identifier || "");
    });
    const subWith = withdrawForm.watch((val, { name }) => {
      if (name === "identifier") onIdentifierChange(val.identifier || "");
    });
    return () => {
      subDep.unsubscribe();
      subWith.unsubscribe();
    };
  }, [users]);

  function onIdentifierChange(q: string) {
    const s = q.trim().toLowerCase();
    if (!s || s.length < 2) return setSuggestions([]);

    const list = users.filter((u) => {
      const phone = u?.phone?.toLowerCase() || "";
      const email = u?.email?.toLowerCase() || "";
      const name = u?.name?.toLowerCase() || "";
      return phone.includes(s) || email.includes(s) || name.includes(s);
    });

    setSuggestions(list.slice(0, 6));
  }

  function pickUser(u: (typeof users)[0]) {
    setSelectedUser(u);
    depositForm.setValue("identifier", u.email);
    withdrawForm.setValue("identifier", u.email);
    setSuggestions([]);
  }

  async function handleDeposit(values: ActionForm) {
    if (Number(values.amount) > Number(agentBalance)) {
      toast.error("Agent has insufficient balance");
      return;
    }
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing your CashIn...");
      const depositData = {
        email: values.identifier,
        type: values.type,
        amount: values.amount,
      };
      const res = await agentCashIn(depositData).unwrap();
      if (res.success) {
        toast.success(`৳${values.amount} added successfully!`, { id: toastId });
        setAgentBalance((prev) => prev - values.amount);
        depositForm.reset({ identifier: "", amount: 0 });
      } else {
        toast.error("Cash In failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  async function handleWithdraw(values: ActionForm) {
    const { fee, totalAmount } = calculateFee(values.amount, "WITHDRAW");
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing your Withdraw...");
      const withdrawData = {
        email: values.identifier,
        type: values.type,
        amount: totalAmount,
        fee: fee,
      };
      const res = await agentCashOut(withdrawData).unwrap();
      if (res.success) {
        toast.success(`৳${totalAmount} cash out successfully!`, {
          id: toastId,
        });
        setAgentBalance((prev) => prev + values.amount);
        withdrawForm.reset({ identifier: "", amount: 0 });
      } else {
        toast.error("Cash Out failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  const presets = [500, 1000, 2000, 5000, 10000];
  function applyPreset(n: number, target: "deposit" | "withdraw") {
    if (target === "deposit")
      depositForm.setValue("amount", n, { shouldValidate: true });
    else withdrawForm.setValue("amount", n, { shouldValidate: true });
  }

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>Agent Terminal | NEOPAY</title>
      </Helmet>

      {/* Modern Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card/60 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-md shadow-none shadow-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-baseline gap-2">
              <NumberTicker
                value={agentBalance}
                className="text-primary tracking-tighter"
              />
              <span className="text-xl font-bold text-muted-foreground uppercase">
                BDT
              </span>
            </h1>
          </div>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Agent Terminal •
            Secure Transactions
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge className="rounded-full px-4 py-1.5 bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-widest text-[10px]">
            Agent Mode Active
          </Badge>
          <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            Protocol v2.4.0
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: User Selection */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="border-none shadow-none shadow-black/[0.03] rounded-md overflow-hidden">
            <CardHeader className="bg-muted/30 pb-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" /> Find Customer
              </CardTitle>
              <CardDescription className="font-medium">
                Enter customer phone, email or name
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  id="globalSearch"
                  placeholder="017..., name or email"
                  className="h-12 pl-12 rounded-xl bg-muted/20 border-border/60 focus:ring-1 font-semibold"
                  onChange={(e) => onIdentifierChange(e.target.value)}
                />

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border/50 bg-popover/90 backdrop-blur-xl p-2 shadow-2xl animate-in zoom-in-95">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left p-3 hover:bg-primary/5 rounded-xl transition-colors flex items-center gap-3 group/item"
                        onClick={() => pickUser(s)}
                      >
                        <Avatar className="h-10 w-10 border border-border/50">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {s.name
                              .split(" ")
                              .map((n: any) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-sm group-hover/item:text-primary transition-colors">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">
                            {s.phone} • {s.email}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                {userLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-4 w-1/2 rounded-xl" />
                  </div>
                ) : selectedUser ? (
                  <div className="flex items-center gap-4 animate-in slide-in-from-left-2">
                    <Avatar className="h-14 w-14 ring-4 ring-background shadow-lg">
                      <AvatarFallback className="bg-primary text-white font-black">
                        {selectedUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-black text-base truncate">
                        {selectedUser.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-tight truncate">
                        {selectedUser.phone} • {selectedUser.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      No User Selected
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Presets Card */}
          <Card className="border-none shadow-none shadow-black/[0.02] rounded-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-[0.15em] text-muted-foreground">
                Quick Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((money) => (
                  <Button
                    key={money}
                    variant="outline"
                    className="h-8 rounded-xl font-medium border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
                    onClick={() => applyPreset(money, "deposit")}
                  >
                    ৳{money.toLocaleString()}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Transaction Forms */}
        <div className="xl:col-span-8">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid grid-cols-2 h-14 p-1.5 bg-muted/50 rounded-2xl border border-border/50 mb-6 w-full">
              <TabsTrigger
                value="add"
                className="rounded-lg font-bold text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <ArrowDownToLine className="h-4 w-4 mr-2" /> CASH IN
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="rounded-lg font-bold text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <ArrowUpFromLine className="h-4 w-4 mr-2" /> CASH OUT
              </TabsTrigger>
            </TabsList>

            {/* Add Money (Cash-in) */}
            <TabsContent value="add" className="mt-0 outline-none">
              <Card className="border-border/50 shadow-none shadow-black/[0.02] rounded-lg overflow-hidden border">
                <div className="bg-primary/5 px-8 py-5 border-b border-border/40">
                  <CardTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    Cash-In to User
                    {/* </Badge> */}
                  </CardTitle>
                </div>
                <CardContent className="p-6 md:p-10">
                  <form
                    onSubmit={depositForm.handleSubmit(handleDeposit)}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Customer Identifier (Email)
                        </Label>
                        <Input
                          placeholder="user@example.com"
                          className="h-12 rounded-lg bg-muted/20 border-border/60 focus:ring-primary/20 font-semibold"
                          {...depositForm.register("identifier")}
                        />
                        {depositForm.formState.errors.identifier && (
                          <p className="text-xs font-bold text-destructive mt-1 ml-1">
                            {depositForm.formState.errors.identifier.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Cash Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl text-muted-foreground">
                            ৳
                          </span>
                          <Input
                            type="number"
                            className="h-14 rounded-lg pl-10 text-2xl font-black bg-muted/20 border-border/60 focus:ring-primary/20 tracking-tighter"
                            {...depositForm.register("amount", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                        {depositForm.formState.errors.amount && (
                          <p className="text-xs font-bold text-destructive mt-1 ml-1">
                            {depositForm.formState.errors.amount.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Method Type
                        </Label>
                        <Select
                          onValueChange={(v) =>
                            depositForm.setValue("type", v as any, {
                              shouldValidate: true,
                            })
                          }
                          defaultValue="ADD_MONEY"
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/60 w-full">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="ADD_MONEY">
                              Direct Cash-In
                            </SelectItem>
                            <SelectItem value="WITHDRAW">
                              Emergency Return
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <Card className="bg-secondary/40 border-none rounded-lg h-full shadow-inner">
                        <CardHeader className="pb-3 pt-6">
                          <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />{" "}
                            Invoice Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                              <span className="text-muted-foreground">
                                Transfer Amount
                              </span>
                              <span className="font-black text-foreground">
                                ৳
                                {(
                                  depositForm.watch("amount") || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                              <span className="text-muted-foreground">
                                Service Fee
                              </span>
                              <span className="font-black text-emerald-600">
                                FREE
                              </span>
                            </div>
                            <Separator className="bg-border/60" />
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-foreground">
                                Net Deductible
                              </span>
                              <span className="text-xl font-black text-primary tracking-tighter">
                                ৳
                                {(
                                  depositForm.watch("amount") || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="pt-6 flex flex-col gap-3">
                            <Button
                              type="submit"
                              className="h-12 rounded-xl font-bold text-base shadow-none shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              CONFIRM CASH-IN
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-10 rounded-xl font-bold text-muted-foreground"
                              onClick={() => depositForm.reset()}
                            >
                              Reset Form
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Withdraw (Cash-out) */}
            <TabsContent value="withdraw" className="mt-0 outline-none">
              <Card className="border-border/50 shadow-none shadow-black/[0.02] rounded-lg overflow-hidden border">
                <div className="bg-destructive/5 px-8 py-5 border-b border-border/40">
                  <CardTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    Cash-Out from User
                  </CardTitle>
                </div>
                <CardContent className="p-6 md:p-10">
                  <form
                    onSubmit={withdrawForm.handleSubmit(handleWithdraw)}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Customer Identifier (Email)
                        </Label>
                        <Input
                          placeholder="user@example.com"
                          className="h-12 rounded-lg bg-muted/20 border-border/60 focus:ring-primary/20 font-semibold"
                          {...withdrawForm.register("identifier")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Withdraw Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl text-muted-foreground">
                            ৳
                          </span>
                          <Input
                            type="number"
                            className="h-14 rounded-lg pl-10 text-2xl font-black bg-muted/20 border-border/60 focus:ring-primary/20 tracking-tighter"
                            {...withdrawForm.register("amount", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">
                          Transaction Method
                        </Label>
                        <Select
                          onValueChange={(v) =>
                            withdrawForm.setValue("type", v as any, {
                              shouldValidate: true,
                            })
                          }
                          defaultValue="WITHDRAW"
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/60 w-full">
                            <SelectValue placeholder="Select Method" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="WITHDRAW">
                              Direct Cash-Out
                            </SelectItem>
                            <SelectItem value="ADD_MONEY">
                              Correction Entry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <Card className="bg-muted/40 border-none rounded-lg h-full shadow-inner">
                        <CardHeader className="pb-3 pt-6">
                          <CardTitle className="text-base font-bold flex items-center gap-2">
                            <MdCreditCard className="h-4 w-4 text-primary" />{" "}
                            Payout Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                              <span className="text-muted-foreground">
                                Gross Amount
                              </span>
                              <span className="font-black">
                                ৳
                                {(
                                  withdrawForm.watch("amount") || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                              <span className="text-muted-foreground">
                                System Fee
                              </span>
                              <span className="font-black text-destructive">
                                ৳
                                {calculateFee(
                                  withdrawForm.watch("amount") || 0,
                                  "WITHDRAW"
                                ).fee.toLocaleString()}
                              </span>
                            </div>
                            <Separator className="bg-border/60" />
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-foreground">
                                Total Payout
                              </span>
                              <span className="text-xl font-black text-primary tracking-tighter">
                                ৳
                                {calculateFee(
                                  withdrawForm.watch("amount") || 0,
                                  "WITHDRAW"
                                ).totalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="pt-6 flex flex-col gap-3">
                            <Button
                              type="submit"
                              className="h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              WITHDRAWAL
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-10 rounded-xl font-bold text-muted-foreground"
                              onClick={() => withdrawForm.reset()}
                            >
                              Reset Form
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm font-bold text-primary">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <span>
            Compliance Tip: Ensure customer signature on physical receipts.
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest text-center md:text-right">
          Security Audited Transaction Layer • 256-bit AES Encrypted
        </div>
      </div>
    </div>
  );
}
