import * as React from "react";
import { useMemo, useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
// shadcn toast hook
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send as SendIcon,
  Info,
  ShieldCheck,
  ReceiptText,
  Sparkles,
  CircleHelp,
} from "lucide-react";
import { toast } from "sonner";

// -------------------- Utils --------------------
const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

function formatBDT(n: number) {
  try {
    return BDT.format(n);
  } catch {
    return `৳${Math.round(n).toLocaleString("en-BD")}`;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function calcFee(amount: number, percent = 0.009, min = 10, max = 200) {
  const fee = clamp(Math.round(amount * percent), min, max);
  return { fee, totalDebit: amount + fee };
}

// -------------------- Validation --------------------
const baseSchema = z.object({
  amount: z
    .number({ error: "Amount is required" })
    .positive("Enter a positive amount")
    .max(200000, "Maximum limit is ৳200,000"),
  note: z.string().max(120, "Note is too long").optional().or(z.literal("")),
});

const depositSchema = baseSchema.extend({
  method: z.enum(["agent", "bank", "card"], {
    required_error: "Select a method",
  }),
});

const withdrawSchema = baseSchema.extend({
  method: z.enum(["agent", "bank"], { required_error: "Select a method" }),
});

const sendSchema = baseSchema.extend({
  recipientType: z.enum(["phone", "email"], {
    required_error: "Choose phone or email",
  }),
  recipient: z
    .string({ error: "Recipient is required" })
    .min(5, "Recipient is too short"),
});

// -------------------- Mock data (replace with RTK Query) --------------------
const MOCK_CONTACTS = [
  { name: "Ayesha Khan", phone: "01711-223344", email: "ayesha@example.com" },
  { name: "Rahim Uddin", phone: "01822-556677", email: "rahim@inbox.com" },
  { name: "Nusrat Jahan", phone: "01633-889900", email: "nusrat@mail.me" },
  { name: "Sakib Hasan", phone: "01944-112233", email: "sakib@work.co" },
];

// -------------------- Reusable UI --------------------
function Header() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2" data-tour="title">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-1 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Fast • Secure • Reliable</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Wallet className="h-7 w-7 text-primary" /> Wallet Actions
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Deposit, Withdraw & Send — all in one place. Seamless like bKash,
          crafted for speed and clarity.{" "}
          <span className="font-medium">বাংলাতেও সহজ।</span>
        </p>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <Badge variant="secondary" className="rounded-xl">
          Live
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                aria-label="Limits & fees"
              >
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-sm">
                Typical fee {"<"}1% (min ৳10, max ৳200). Real-time fraud checks
                & encryption in transit.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function BalanceTile({
  balance,
  loading,
}: {
  balance: number;
  loading?: boolean;
}) {
  return (
    <Card className="border-dashed" data-tour="balance">
      <CardHeader className="pb-2">
        <CardDescription>Current Balance</CardDescription>
        <CardTitle className="text-3xl">
          {loading ? (
            <Skeleton className="h-9 w-40" />
          ) : (
            <span>{formatBDT(balance)}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Protected by device binding & OTP</span>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickAmounts({ onPick }: { onPick: (n: number) => void }) {
  const presets = [500, 1000, 2000, 5000, 10000];
  return (
    <div className="flex flex-wrap gap-2" data-tour="quick-amounts">
      {presets.map((p) => (
        <Button
          key={p}
          type="button"
          variant="secondary"
          className="rounded-xl"
          onClick={() => onPick(p)}
        >
          {formatBDT(p)}
        </Button>
      ))}
    </div>
  );
}

function FeeSummary({ amount, balance }: { amount: number; balance: number }) {
  const { fee, totalDebit } = useMemo(() => calcFee(amount), [amount]);
  const canAfford = totalDebit <= balance;
  return (
    <div className="space-y-2 text-sm" data-tour="fee-summary">
      <div className="flex justify-between">
        <span>Amount</span>
        <span>{formatBDT(amount || 0)}</span>
      </div>
      <div className="flex justify-between">
        <span>Fee</span>
        <span>{formatBDT(amount ? fee : 0)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatBDT(amount ? totalDebit : 0)}</span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>New balance</span>
        <span>{formatBDT(amount ? balance - totalDebit : balance)}</span>
      </div>
      {!canAfford && amount > 0 && (
        <p className="text-destructive text-xs">
          Insufficient balance for this amount including fee.
        </p>
      )}
    </div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground mt-1">{children}</p>;
}

// -------------------- Main Component --------------------
export default function WalletActionsPage() {
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
    defaultValues: { amount: 0, method: "agent", note: "" },
    mode: "onChange",
  });

  // ---- Withdraw form ----
  const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, method: "agent", note: "" },
    mode: "onChange",
  });

  // ---- Send form ----
  const sendForm = useForm<z.infer<typeof sendSchema>>({
    resolver: zodResolver(sendSchema),
    defaultValues: {
      amount: 0,
      recipient: "",
      recipientType: "phone",
      note: "",
    },
    mode: "onChange",
  });

  // Mock recipient search
  const [suggestions, setSuggestions] = useState<typeof MOCK_CONTACTS>([]);
  useEffect(() => {
    const sub = sendForm.watch((values, { name }) => {
      if (name === "recipient" || name === "recipientType") {
        const q = values.recipient?.toLowerCase() || "";
        if (q.length < 2) return setSuggestions([]);
        const list = MOCK_CONTACTS.filter((c) =>
          values.recipientType === "phone"
            ? c.phone.replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, ""))
            : c.email.toLowerCase().includes(q)
        ).slice(0, 5);
        setSuggestions(list);
      }
    });
    return () => sub.unsubscribe();
  }, [sendForm]);

  // ---- Handlers (replace with RTK Query mutations) ----
  async function onDeposit(values: z.infer<typeof depositSchema>) {
    // TODO: replace with rtk-query: const [deposit] = useDepositMutation(); await deposit(values)
    await new Promise((r) => setTimeout(r, 600));
    setBalance((b) => b + values.amount);
    toast.success({
      title: "Deposit successful",
      description: `${formatBDT(values.amount)} added via ${values.method}.`,
    });
    depositForm.reset({ ...values, amount: 0, note: "" });
  }

  async function onWithdraw(values: z.infer<typeof withdrawSchema>) {
    const { fee, totalDebit } = calcFee(values.amount);
    if (totalDebit > balance) {
      toast({
        title: "Insufficient balance",
        description: "Try a lower amount.",
        variant: "destructive",
      });
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    setBalance((b) => b - totalDebit);
    toast({
      title: "Withdraw requested",
      description: `${formatBDT(values.amount)} to ${
        values.method
      } (fee ${formatBDT(fee)}).`,
    });
    withdrawForm.reset({ ...values, amount: 0, note: "" });
  }

  async function onSend(values: z.infer<typeof sendSchema>) {
    const { fee, totalDebit } = calcFee(values.amount);
    if (totalDebit > balance) {
      toast({
        title: "Insufficient balance",
        description: "Try a lower amount.",
        variant: "destructive",
      });
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    setBalance((b) => b - totalDebit);
    toast({
      title: "Money sent",
      description: `${formatBDT(values.amount)} sent to ${values.recipient} (${
        values.recipientType
      }). Fee ${formatBDT(fee)}.`,
    });
    sendForm.reset({ ...values, amount: 0, note: "" });
  }

  // -------------------- UI --------------------
  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8 space-y-6">
      <Header />

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        data-tour="overview"
      >
        <BalanceTile balance={balance} loading={loading} />

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ReceiptText className="h-5 w-5 text-primary" /> Quick Actions
            </CardTitle>
            <CardDescription>
              Pick a preset, then finalize in the form below.{" "}
              <span className="font-medium">রিচার্জ / উইথড্র / সেন্ড</span>
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
                  <Label htmlFor="deposit-method">Method</Label>
                  <Select
                    onValueChange={(v) =>
                      depositForm.setValue("method", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={depositForm.getValues("method")}
                  >
                    <SelectTrigger id="deposit-method" className="rounded-xl">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent (Cash-in)</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="card">Debit/Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  {depositForm.formState.errors.method && (
                    <p className="text-destructive text-xs mt-1">
                      {depositForm.formState.errors.method.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deposit-amount">Amount</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 1000"
                    className="rounded-xl"
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
                  <Label htmlFor="deposit-note">
                    Note{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="deposit-note"
                    placeholder="Reference e.g. Cash-in from agent #1234"
                    className="rounded-xl"
                    {...depositForm.register("note")}
                  />
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
                    />
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tip</AlertTitle>
                  <AlertDescription>
                    Agent cash-in may require a confirmation code. Keep your
                    phone nearby.
                  </AlertDescription>
                </Alert>
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
                  <Label htmlFor="withdraw-method">Method</Label>
                  <Select
                    onValueChange={(v) =>
                      withdrawForm.setValue("method", v as any, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={withdrawForm.getValues("method")}
                  >
                    <SelectTrigger id="withdraw-method" className="rounded-xl">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent Cash-out</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  {withdrawForm.formState.errors.method && (
                    <p className="text-destructive text-xs mt-1">
                      {withdrawForm.formState.errors.method.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 5000"
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
                  <Label htmlFor="withdraw-note">
                    Note{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="withdraw-note"
                    placeholder="Purpose or reference"
                    className="rounded-xl"
                    {...withdrawForm.register("note")}
                  />
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
                    />
                  </CardContent>
                </Card>

                <Alert>
                  <CircleHelp className="h-4 w-4" />
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    Daily cash-out limit applies. NID verification may be
                    required.
                  </AlertDescription>
                </Alert>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <Label>Send via</Label>
                    <Select
                      defaultValue={sendForm.getValues("recipientType")}
                      onValueChange={(v) =>
                        sendForm.setValue("recipientType", v as any, {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="send-recipient">
                      Recipient{" "}
                      {sendForm.watch("recipientType") === "phone"
                        ? "(Phone)"
                        : "(Email)"}
                    </Label>
                    <Input
                      id="send-recipient"
                      placeholder={
                        sendForm.watch("recipientType") === "phone"
                          ? "e.g. 017XXXXXXXX"
                          : "e.g. user@mail.com"
                      }
                      className="rounded-xl"
                      {...sendForm.register("recipient")}
                    />
                    {sendForm.formState.errors.recipient && (
                      <p className="text-destructive text-xs mt-1">
                        {sendForm.formState.errors.recipient.message}
                      </p>
                    )}
                    {suggestions.length > 0 && (
                      <div className="mt-2 rounded-xl border p-2 text-sm divide-y">
                        {suggestions.map((c) => (
                          <button
                            type="button"
                            key={c.email}
                            className="flex w-full items-center justify-between gap-3 p-2 hover:bg-muted/60 rounded-lg"
                            onClick={() =>
                              sendForm.setValue(
                                "recipient",
                                sendForm.getValues("recipientType") === "phone"
                                  ? c.phone
                                  : c.email,
                                { shouldValidate: true }
                              )
                            }
                          >
                            <span className="font-medium">{c.name}</span>
                            <span className="text-muted-foreground">
                              {sendForm.getValues("recipientType") === "phone"
                                ? c.phone
                                : c.email}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    <FieldHint>
                      Type at least 2 characters to search recent contacts.
                    </FieldHint>
                  </div>
                </div>

                <div>
                  <Label htmlFor="send-amount">Amount</Label>
                  <Input
                    id="send-amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 750"
                    className="rounded-xl"
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
                  <Label htmlFor="send-note">
                    Note{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="send-note"
                    placeholder="Reason, invoice or memo"
                    className="rounded-xl"
                    {...sendForm.register("note")}
                  />
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
                    />
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Recipient name will be shown</AlertTitle>
                  <AlertDescription>
                    Double-check the number/email before confirming.
                  </AlertDescription>
                </Alert>
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
