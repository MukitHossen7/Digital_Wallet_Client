import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  UserPlus2,
  Search,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

// -------------------- Types & Utils --------------------
const BDT = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});
const formatBDT = (n: number) => {
  try {
    return BDT.format(Math.round(n));
  } catch {
    return `৳${Math.round(n).toLocaleString()}`;
  }
};

function calcFee(amount: number, percent = 0.009, min = 10, max = 200) {
  const fee = Math.min(Math.max(Math.round(amount * percent), min), max);
  return { fee, totalDebit: amount + fee };
}

// -------------------- Validation --------------------
const baseSchema = z.object({
  identifier: z.string().min(5, "Enter phone or email of the user"),
  amount: z
    .number({ error: "Amount is required" })
    .positive("Enter a positive amount")
    .max(200000, "Maximum ৳200,000"),
  note: z.string().max(120, "Note too long").optional(),
});

type ActionForm = z.infer<typeof baseSchema>;

// -------------------- Mocked users (replace with API) --------------------
const MOCK_USERS = [
  {
    id: "u_101",
    name: "Ayesha Khan",
    phone: "+8801711223344",
    email: "ayesha@example.com",
    balance: 5200,
  },
  {
    id: "u_102",
    name: "Rahim Uddin",
    phone: "+8801822556677",
    email: "rahim@inbox.com",
    balance: 250,
  },
  {
    id: "u_103",
    name: "Nusrat Jahan",
    phone: "+8801633889900",
    email: "nusrat@mail.me",
    balance: 12000,
  },
  {
    id: "u_104",
    name: "Sakib Hasan",
    phone: "+8801944112233",
    email: "sakib@work.co",
    balance: 800,
  },
];

// -------------------- Component --------------------
export default function AgentWallet() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<
    (typeof MOCK_USERS)[0] | null
  >(null);

  // forms
  const depositForm = useForm<ActionForm>({
    resolver: zodResolver(baseSchema),
    defaultValues: { identifier: "", amount: 0, note: "" },
    mode: "onChange",
  });

  const withdrawForm = useForm<ActionForm>({
    resolver: zodResolver(baseSchema),
    defaultValues: { identifier: "", amount: 0, note: "" },
    mode: "onChange",
  });

  // search suggestions
  const [suggestions, setSuggestions] = useState<typeof users>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // watch identifier from both forms and update suggestions
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
    const list = users.filter(
      (u) =>
        u.phone.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.name.toLowerCase().includes(s)
    );
    setSuggestions(list.slice(0, 6));
  }

  function pickUser(u: (typeof users)[0]) {
    setSelectedUser(u);
    // populate identifier fields in both forms so agent can switch tabs seamlessly
    depositForm.setValue("identifier", u.phone);
    withdrawForm.setValue("identifier", u.phone);
    setSuggestions([]);
  }

  // ---- Handlers ----
  async function handleDeposit(values: ActionForm) {
    if (!selectedUser) {
      toast.error("Select a user first");
      return;
    }
    await toast.promise(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            // simulate server: update user's balance
            setUsers((prev) =>
              prev.map((u) =>
                u.id === selectedUser.id
                  ? { ...u, balance: u.balance + values.amount }
                  : u
              )
            );
            setSelectedUser((prev) =>
              prev ? { ...prev, balance: prev.balance + values.amount } : prev
            );
            resolve();
          }, 700);
        }),
      {
        loading: "Adding money...",
        success: "Money added successfully",
        error: "Failed to add money",
      }
    );
    depositForm.reset({ identifier: selectedUser.phone, amount: 0, note: "" });
  }

  async function handleWithdraw(values: ActionForm) {
    if (!selectedUser) {
      toast.error("Select a user first");
      return;
    }
    const { fee, totalDebit } = calcFee(values.amount);
    if (totalDebit > selectedUser.balance) {
      toast.error("Insufficient balance for this user");
      return;
    }

    await toast.promise(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === selectedUser.id
                  ? { ...u, balance: u.balance - totalDebit }
                  : u
              )
            );
            setSelectedUser((prev) =>
              prev ? { ...prev, balance: prev.balance - totalDebit } : prev
            );
            resolve();
          }, 800);
        }),
      {
        loading: "Processing withdraw...",
        success: `Withdraw successful (fee ${formatBDT(fee)})`,
        error: "Withdraw failed",
      }
    );

    withdrawForm.reset({ identifier: selectedUser.phone, amount: 0, note: "" });
  }

  // Quick amounts
  const presets = [500, 1000, 2000, 5000, 10000];
  function applyPreset(n: number, target: "deposit" | "withdraw") {
    if (target === "deposit")
      depositForm.setValue("amount", n, { shouldValidate: true });
    else withdrawForm.setValue("amount", n, { shouldValidate: true });
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8">
      <Toaster />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
            <UserPlus2 className="h-6 w-6 text-primary" /> Agent — Cash In /
            Cash Out
          </h1>
          <p className="text-sm text-muted-foreground">
            Add or withdraw money from a user's wallet — বিকাশ-স্টাইল একটি এক
            পেজে অভিজ্ঞতা।
          </p>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          Agent Mode
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Selected user & quick info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected user</CardTitle>
              <CardDescription>Search by phone, email or name</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <Label htmlFor="globalSearch">Find user</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </span>
                  <Input
                    id="globalSearch"
                    placeholder="017..., name or email"
                    className="pl-10 rounded-xl"
                    onChange={(e) => onIdentifierChange(e.target.value)}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-2 rounded-xl border bg-popover p-2 text-sm divide-y">
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        className="w-full text-left p-2 hover:bg-muted/60 rounded-md"
                        onClick={() => pickUser(s)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {s.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{s.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {s.phone} • {s.email}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ) : selectedUser ? (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {selectedUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedUser.phone} • {selectedUser.email}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Current balance
                    </div>
                    <div className="text-2xl font-semibold">
                      {formatBDT(selectedUser.balance)}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Transaction logs &
                    receipts available.
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No user selected. Search above or click a suggestion.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="text-sm">Quick presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <Button
                    key={p}
                    variant="ghost"
                    className="rounded-xl"
                    onClick={() => applyPreset(p, "deposit")}
                  >
                    {formatBDT(p)}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                Tap a preset to quickly fill amount in current form tab.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Tabs for Add / Withdraw */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="add" className="gap-2">
                <ArrowDownToLine className="h-4 w-4" /> Add money
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="gap-2">
                <ArrowUpFromLine className="h-4 w-4" /> Withdraw
              </TabsTrigger>
            </TabsList>

            {/* Add Money */}
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Add money to user's wallet
                  </CardTitle>
                  <CardDescription>
                    Agent cash-in — provide cash to user and record transaction
                    here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    onSubmit={depositForm.handleSubmit(handleDeposit)}
                  >
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="identifierDep">
                        User (phone or email)
                      </Label>
                      <Input
                        id="identifierDep"
                        placeholder="e.g. +88017... or user@mail.com"
                        className="rounded-xl"
                        {...depositForm.register("identifier")}
                      />

                      <Label htmlFor="amountDep" className="mt-2">
                        Amount
                      </Label>
                      <Input
                        id="amountDep"
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

                      <Label htmlFor="noteDep" className="mt-2">
                        Note (optional)
                      </Label>
                      <Input
                        id="noteDep"
                        placeholder="e.g. Cash-in at agent #1033"
                        className="rounded-xl"
                        {...depositForm.register("note")}
                      />

                      <div className="text-xs text-muted-foreground mt-2">
                        Tip: Confirm cash received from user before marking as
                        added.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-sm">Summary</CardTitle>
                          <CardDescription>
                            Estimated effect on balance
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                              <span>Amount</span>
                              <strong>
                                {formatBDT(depositForm.watch("amount") || 0)}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Fee</span>
                              <strong>{formatBDT(0)}</strong>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <span>New balance</span>
                              <strong>
                                {selectedUser
                                  ? formatBDT(
                                      (selectedUser.balance || 0) +
                                        (depositForm.watch("amount") || 0)
                                    )
                                  : "—"}
                              </strong>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          type="button"
                          className="rounded-xl"
                          onClick={() =>
                            depositForm.reset({
                              identifier: selectedUser?.phone || "",
                              amount: 0,
                              note: "",
                            })
                          }
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          className="rounded-xl"
                          disabled={!depositForm.formState.isValid}
                        >
                          Add money
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Withdraw */}
            <TabsContent value="withdraw">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Withdraw money from user's wallet
                  </CardTitle>
                  <CardDescription>
                    Agent cash-out — ensure user identity and collect fee if
                    applicable.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    onSubmit={withdrawForm.handleSubmit(handleWithdraw)}
                  >
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="identifierWith">
                        User (phone or email)
                      </Label>
                      <Input
                        id="identifierWith"
                        placeholder="e.g. +88017... or user@mail.com"
                        className="rounded-xl"
                        {...withdrawForm.register("identifier")}
                      />

                      <Label htmlFor="amountWith" className="mt-2">
                        Amount
                      </Label>
                      <Input
                        id="amountWith"
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g. 500"
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

                      <Label htmlFor="noteWith" className="mt-2">
                        Note (optional)
                      </Label>
                      <Input
                        id="noteWith"
                        placeholder="e.g. Cash-out at agent #204"
                        className="rounded-xl"
                        {...withdrawForm.register("note")}
                      />

                      <div className="text-xs text-muted-foreground mt-2">
                        Fee applies: ~0.9% (min ৳10, max ৳200). New balance will
                        reflect fee deduction.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-sm">Summary</CardTitle>
                          <CardDescription>
                            Includes estimated fee
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                              <span>Amount</span>
                              <strong>
                                {formatBDT(withdrawForm.watch("amount") || 0)}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Fee</span>
                              <strong>
                                {formatBDT(
                                  calcFee(withdrawForm.watch("amount") || 0).fee
                                )}
                              </strong>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <span>Total debit</span>
                              <strong>
                                {formatBDT(
                                  calcFee(withdrawForm.watch("amount") || 0)
                                    .totalDebit
                                )}
                              </strong>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>New balance</span>
                              <strong>
                                {selectedUser
                                  ? formatBDT(
                                      (selectedUser.balance || 0) -
                                        calcFee(
                                          withdrawForm.watch("amount") || 0
                                        ).totalDebit
                                    )
                                  : "—"}
                              </strong>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          type="button"
                          className="rounded-xl"
                          onClick={() =>
                            withdrawForm.reset({
                              identifier: selectedUser?.phone || "",
                              amount: 0,
                              note: "",
                            })
                          }
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          className="rounded-xl"
                          disabled={!withdrawForm.formState.isValid}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Sparkles className="h-4 w-4" /> Tip: All agent actions are logged. Keep
        a receipt for the customer.
      </div>
    </div>
  );
}
