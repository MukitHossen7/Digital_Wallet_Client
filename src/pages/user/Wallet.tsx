/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "lucide-react";
import { toast } from "sonner";
import WalletHeader from "@/components/modules/user/wallet/WalletHeader";
import BalanceCard from "@/components/modules/user/wallet/BalanceCard";
import QuickAmounts from "@/components/modules/user/wallet/QuickAmounts";
import FeeSummary from "@/components/modules/user/wallet/FeeSummary";
import { txType } from "@/constants/txType";
import { calculateFee } from "@/utils/claculateFee";

// -------------------- Validation --------------------

const depositSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  agentId: z.string().min(1, { error: "Agent Email is Required" }),
});

const withdrawSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  agentId: z.string().min(1, { error: "Agent Email is Required" }),
});

const sendSchema = z.object({
  amount: z.number().min(50, { error: "Minimum amount 50" }),
  type: z.enum(["ADD_MONEY", "WITHDRAW", "SEND_MONEY"], {
    error: "Type is Required",
  }),
  email: z.email(),
});

// -------------------- Reusable UI --------------------

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground mt-1">{children}</p>;
}

// -------------------- Main Component --------------------
export default function WalletPage() {
  // Simulate fetching balance
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(12500);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600); // skeleton effect
    return () => clearTimeout(t);
  }, []);

  // ---- Deposit form ----
  const depositForm = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0,
      agentId: "",
      type: "ADD_MONEY",
    },
  });

  // ---- Withdraw form ----
  const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      agentId: "",
      type: "WITHDRAW",
    },
  });

  // ---- Send form ----
  const sendForm = useForm<z.infer<typeof sendSchema>>({
    resolver: zodResolver(sendSchema),
    defaultValues: {
      amount: 0,
      email: "",
      type: "SEND_MONEY",
    },
  });

  // ---- Handlers (replace with RTK Query mutations) ----
  async function onDeposit(values: z.infer<typeof depositSchema>) {
    // TODO: replace with rtk-query: const [deposit] = useDepositMutation(); await deposit(values)
    await new Promise((r) => setTimeout(r, 600));

    setBalance((b) => b + values.amount);
    console.log(values);
    toast.success("Deposit successfully");
    depositForm.reset({ ...values, amount: 0 });
  }

  async function onWithdraw(values: z.infer<typeof withdrawSchema>) {
    const { totalAmount } = calculateFee(values.amount, "WITHDRAW");
    if (totalAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    setBalance((b) => b - totalAmount);
    toast.success("With draw successfully");
    console.log(values);
    withdrawForm.reset({ ...values, amount: 0 });
  }

  async function onSend(values: z.infer<typeof sendSchema>) {
    const { totalAmount } = calculateFee(values.amount, "SEND_MONEY");
    if (totalAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    setBalance((b) => b - totalAmount);
    toast("Sent Money Successfully");
    console.log(values);
    sendForm.reset({ ...values, amount: 0 });
  }

  // -------------------- UI --------------------
  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8 space-y-6">
      <WalletHeader />

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        data-tour="overview"
      >
        <BalanceCard balance={balance} loading={loading} />

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ReceiptText className="h-5 w-5 text-primary" /> Quick Actions
            </CardTitle>
            <CardDescription>
              Pick a preset, then finalize in the form below.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <QuickAmounts
                onPick={(n) => {
                  // apply to the active tab's amount field
                  const active = document
                    .querySelector('[data-active-tab="true"]')
                    ?.getAttribute("data-value");
                  if (active === "deposit")
                    depositForm.setValue("amount", n, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  if (active === "withdraw")
                    withdrawForm.setValue("amount", n, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  if (active === "send")
                    sendForm.setValue("amount", n, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deposit" className="w-full" data-tour="tabs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="deposit"
            data-value="deposit"
            data-active-tab={true}
            onFocus={(e) => {
              // mark active
              document
                .querySelectorAll('[role="tab"]')
                .forEach((el) => el.setAttribute("data-active-tab", "false"));
              (e.currentTarget as HTMLElement).setAttribute(
                "data-active-tab",
                "true"
              );
            }}
            className="gap-2"
          >
            <ArrowDownToLine className="h-4 w-4" /> Deposit
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            data-value="withdraw"
            onFocus={(e) => {
              document
                .querySelectorAll('[role="tab"]')
                .forEach((el) => el.setAttribute("data-active-tab", "false"));
              (e.currentTarget as HTMLElement).setAttribute(
                "data-active-tab",
                "true"
              );
            }}
            className="gap-2"
          >
            <ArrowUpFromLine className="h-4 w-4" /> Withdraw
          </TabsTrigger>
          <TabsTrigger
            value="send"
            data-value="send"
            onFocus={(e) => {
              document
                .querySelectorAll('[role="tab"]')
                .forEach((el) => el.setAttribute("data-active-tab", "false"));
              (e.currentTarget as HTMLElement).setAttribute(
                "data-active-tab",
                "true"
              );
            }}
            className="gap-2"
          >
            <SendIcon className="h-4 w-4" /> Send
          </TabsTrigger>
        </TabsList>

        {/* Deposit */}
        <TabsContent value="deposit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ArrowDownToLine className="h-5 w-5 text-primary" /> Deposit
                Money
              </CardTitle>
              <CardDescription>
                Cash-in via Agent, Bank or Card. Instant balance update.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="deposit-method">Payment Type</Label>
                  <Select
                    onValueChange={(v) =>
                      depositForm.setValue("type", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={depositForm.getValues("type")}
                  >
                    <SelectTrigger
                      id="deposit-method"
                      className="rounded-md w-full"
                    >
                      <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
                      <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                      <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                    </SelectContent>
                  </Select>
                  {depositForm.formState.errors.type && (
                    <p className="text-destructive text-xs mt-1">
                      {depositForm.formState.errors.type.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deposit-amount">Amount</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 50"
                    className="rounded-md w-full"
                    value={depositForm.watch("amount") || ""}
                    onChange={(e) =>
                      depositForm.setValue(
                        "amount",
                        Number(e.target.value || 0),
                        { shouldValidate: true }
                      )
                    }
                  />
                  {depositForm.formState.errors.amount && (
                    <p className="text-destructive text-xs mt-1">
                      {depositForm.formState.errors.amount.message}
                    </p>
                  )}
                  <FieldHint>
                    Use quick buttons above for common amounts.
                  </FieldHint>
                </div>

                <div>
                  <Label htmlFor="deposit-method">Agent Email</Label>
                  <Select
                    onValueChange={(v) =>
                      depositForm.setValue("agentId", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={depositForm.getValues("agentId")}
                  >
                    <SelectTrigger
                      id="deposit-method"
                      className="rounded-md w-full"
                    >
                      <SelectValue placeholder="Select Agent Email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">mukit@gmil.com</SelectItem>
                      <SelectItem value="2">mim@gmil.com</SelectItem>
                      <SelectItem value="3">mou@gmil.com</SelectItem>
                    </SelectContent>
                  </Select>
                  {depositForm.formState.errors.agentId && (
                    <p className="text-destructive text-xs mt-1">
                      {depositForm.formState.errors.agentId.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Summary</CardTitle>
                    <CardDescription>Estimated fees & totals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FeeSummary
                      amount={depositForm.watch("amount") || 0}
                      balance={balance}
                      type={txType.ADD_MONEY as "ADD_MONEY"}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                className="rounded-xl"
                type="button"
                onClick={() => depositForm.reset()}
              >
                Reset
              </Button>
              <Button
                className="rounded-xl"
                onClick={depositForm.handleSubmit(onDeposit)}
              >
                Deposit Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Withdraw */}
        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ArrowUpFromLine className="h-5 w-5 text-primary" /> Withdraw
                Money
              </CardTitle>
              <CardDescription>
                Cash-out to Agent or transfer to Bank account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="deposit-method">Payment Type</Label>
                  <Select
                    onValueChange={(v) =>
                      withdrawForm.setValue("type", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={withdrawForm.getValues("type")}
                  >
                    <SelectTrigger
                      id="deposit-method"
                      className="rounded-md w-full"
                    >
                      <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
                      <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                      <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                    </SelectContent>
                  </Select>
                  {withdrawForm.formState.errors.type && (
                    <p className="text-destructive text-xs mt-1">
                      {withdrawForm.formState.errors.type.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 50"
                    className="rounded-xl"
                    value={withdrawForm.watch("amount") || ""}
                    onChange={(e) =>
                      withdrawForm.setValue(
                        "amount",
                        Number(e.target.value || 0),
                        { shouldValidate: true }
                      )
                    }
                  />
                  {withdrawForm.formState.errors.amount && (
                    <p className="text-destructive text-xs mt-1">
                      {withdrawForm.formState.errors.amount.message}
                    </p>
                  )}
                  <FieldHint>
                    Fees apply. Ensure agent availability before cash-out.
                  </FieldHint>
                </div>

                <div>
                  <Label htmlFor="deposit-method">Agent Email</Label>
                  <Select
                    onValueChange={(v) =>
                      withdrawForm.setValue("agentId", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={withdrawForm.getValues("agentId")}
                  >
                    <SelectTrigger
                      id="deposit-method"
                      className="rounded-md w-full"
                    >
                      <SelectValue placeholder="Select Agent Email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">mukit@gmil.com</SelectItem>
                      <SelectItem value="2">mim@gmil.com</SelectItem>
                      <SelectItem value="3">mou@gmil.com</SelectItem>
                    </SelectContent>
                  </Select>
                  {withdrawForm.formState.errors.agentId && (
                    <p className="text-destructive text-xs mt-1">
                      {withdrawForm.formState.errors.agentId.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Summary</CardTitle>
                    <CardDescription>Total including fee</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FeeSummary
                      amount={withdrawForm.watch("amount") || 0}
                      balance={balance}
                      type={txType.WITHDRAW as "WITHDRAW"}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                className="rounded-xl"
                type="button"
                onClick={() => withdrawForm.reset()}
              >
                Reset
              </Button>
              <Button
                className="rounded-xl"
                onClick={withdrawForm.handleSubmit(onWithdraw)}
              >
                Withdraw
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Send */}
        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <SendIcon className="h-5 w-5 text-primary" /> Send Money
              </CardTitle>
              <CardDescription>
                Transfer to another wallet using phone or email.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="deposit-method">Payment Type</Label>
                  <Select
                    onValueChange={(v) =>
                      sendForm.setValue("type", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={sendForm.getValues("type")}
                  >
                    <SelectTrigger
                      id="deposit-method"
                      className="rounded-md w-full"
                    >
                      <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADD_MONEY">Deposit Money</SelectItem>
                      <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                      <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                    </SelectContent>
                  </Select>
                  {sendForm.formState.errors.type && (
                    <p className="text-destructive text-xs mt-1">
                      {sendForm.formState.errors.type.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="send-amount">Amount</Label>
                  <Input
                    id="send-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 750"
                    className="rounded-md"
                    value={sendForm.watch("amount") || ""}
                    onChange={(e) =>
                      sendForm.setValue("amount", Number(e.target.value || 0), {
                        shouldValidate: true,
                      })
                    }
                  />
                  {sendForm.formState.errors.amount && (
                    <p className="text-destructive text-xs mt-1">
                      {sendForm.formState.errors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="send-email">Receiver Email</Label>
                  <Input
                    id="send-email"
                    type="email"
                    inputMode="email"
                    placeholder="jon@gmail.com"
                    className="rounded-md"
                    value={sendForm.watch("email") || ""}
                    onChange={(e) =>
                      sendForm.setValue("email", e.target.value || "", {
                        shouldValidate: true,
                      })
                    }
                  />
                  {sendForm.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {sendForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Summary</CardTitle>
                    <CardDescription>Includes network fee</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FeeSummary
                      amount={sendForm.watch("amount") || 0}
                      balance={balance}
                      type={txType.SEND_MONEY as "SEND_MONEY"}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                className="rounded-xl"
                type="button"
                onClick={() => sendForm.reset()}
              >
                Reset
              </Button>
              <Button
                className="rounded-xl"
                onClick={sendForm.handleSubmit(onSend)}
              >
                Send Money
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-3 gap-4" data-tour="info">
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            End-to-end encryption, device binding, OTP & behavioral risk checks.
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Support</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            24/7 chat • Dispute resolution • Refund flows for failed transfers.
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Compliance</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            KYC/AML aligned. Limits & fees configurable from Admin panel.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
