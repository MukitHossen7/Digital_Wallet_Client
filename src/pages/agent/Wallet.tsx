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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Sparkles,
} from "lucide-react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
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

// -------------------- Types & Utils --------------------

// function calcFee(amount: number, percent = 0.009, min = 10, max = 200) {
//   const fee = Math.min(Math.max(Math.round(amount * percent), min), max);
//   return { fee, totalDebit: amount + fee };
// }

// -------------------- Validation --------------------
const baseSchema = z.object({
  identifier: z.string().min(5, "Enter phone or email of the user"),
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

// -------------------- Component --------------------
export default function AgentWallet() {
  const { data: userData, isLoading: userLoading } = useGetAllUserAndAgentQuery(
    { user: "user" }
  );
  const { data: walletData } = useGetMeWalletQuery(undefined);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [agentBalance, setAgentBalance] = useState<number>(0);

  // forms
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

  // search suggestions
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
    // populate identifier fields in both forms so agent can switch tabs seamlessly
    depositForm.setValue("identifier", u.email);
    withdrawForm.setValue("identifier", u.email);
    setSuggestions([]);
  }

  // ---- Handlers ----
  async function handleDeposit(values: ActionForm) {
    // if (!selectedUser) {
    //   toast.error("Select a user first");
    //   return;
    // }
    if (values.amount > agentBalance) {
      toast.error("Agent has insufficient balance");
      return;
    }
    setSelectedUser((prev) =>
      prev ? { ...prev, balance: prev.balance + values.amount } : prev
    );
    setAgentBalance((prev) => prev - values.amount);

    toast.success(`৳${values.amount} added to ${selectedUser?.name}'s wallet`);
    console.log(values);

    depositForm.reset({ identifier: "", amount: 0 });
  }

  async function handleWithdraw(values: ActionForm) {
    if (!selectedUser) {
      toast.error("Select a user first");
      return;
    }
    const { totalAmount } = calculateFee(values.amount, "WITHDRAW");
    if (totalAmount > selectedUser.balance) {
      toast.error("Insufficient balance for this user");
      return;
    }
    setSelectedUser({
      ...selectedUser,
      balance: selectedUser.balance - totalAmount,
    });
    setAgentBalance((prev) => prev + values.amount);
    console.log(values);
    withdrawForm.reset({ identifier: "", amount: 0 });
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
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
            <MdOutlineAccountBalanceWallet className="h-6 w-6 text-primary" />{" "}
            Agent: {agentBalance} BDT
          </h1>
          <p className="text-sm text-muted-foreground">
            Add or withdraw money from a user's wallet
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
                    className="pl-10 rounded-md"
                    onChange={(e) => onIdentifierChange(e.target.value)}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-2 rounded-xl border bg-popover p-2 text-sm divide-y">
                    {suggestions.map((s, idx: any) => (
                      <button
                        key={idx}
                        className="w-full text-left p-2 hover:bg-muted/60 rounded-md"
                        onClick={() => pickUser(s)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {s.name
                                .split(" ")
                                .map((n: any) => n[0])
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

              {userLoading ? (
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
                {presets.map((money) => (
                  <Button
                    key={money}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() => applyPreset(money, "deposit")}
                  >
                    BDT {money}
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
                  <CardTitle>Add money</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={depositForm.handleSubmit(handleDeposit)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="md:col-span-2 space-y-2">
                      <Label>User (email)</Label>
                      <Input
                        placeholder="e.g. user@mail.com"
                        {...depositForm.register("identifier")}
                      />
                      {depositForm.formState.errors.identifier && (
                        <p className="text-xs text-red-500">
                          {depositForm.formState.errors.identifier.message}
                        </p>
                      )}

                      <Label>Amount</Label>
                      <Input
                        type="number"
                        {...depositForm.register("amount", {
                          valueAsNumber: true,
                        })}
                      />
                      {depositForm.formState.errors.amount && (
                        <p className="text-xs text-red-500">
                          {depositForm.formState.errors.amount.message}
                        </p>
                      )}

                      <Label>Payment Type</Label>
                      <Select
                        onValueChange={(v) =>
                          depositForm.setValue("type", v as any, {
                            shouldValidate: true,
                          })
                        }
                        defaultValue={depositForm.getValues("type")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Payment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADD_MONEY">Add Money</SelectItem>
                          <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      {/* summary */}
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-sm">Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span>Amount</span>
                              <strong className="text-sm">
                                BDT {depositForm.watch("amount") || 0}
                              </strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Fee</span>
                              <strong className="text-sm">
                                BDT{" "}
                                {
                                  calculateFee(
                                    depositForm.watch("amount") || 0,
                                    "WITHDRAW"
                                  ).fee
                                }
                              </strong>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span>Total Amount</span>
                              <strong className="text-sm">
                                BDT {depositForm.watch("amount") || 0}
                              </strong>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => depositForm.reset()}
                        >
                          Reset
                        </Button>
                        <Button type="submit">Add money</Button>
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
                      <Label htmlFor="identifierWith">User ( email)</Label>
                      <Input
                        id="identifierWith"
                        placeholder="e.g. user@mail.com"
                        className="rounded-md"
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
                        className="rounded-md"
                        value={withdrawForm.watch("amount") || ""}
                        onChange={(e) =>
                          withdrawForm.setValue(
                            "amount",
                            Number(e.target.value || 0),
                            { shouldValidate: true }
                          )
                        }
                      />

                      <div>
                        <Label htmlFor="withdraw-method">Payment Type</Label>
                        <Select
                          onValueChange={(v) =>
                            withdrawForm.setValue("type", v as any, {
                              shouldValidate: true,
                            })
                          }
                          defaultValue={withdrawForm.getValues("type")}
                        >
                          <SelectTrigger
                            id="withdraw-method"
                            className="rounded-md w-full"
                          >
                            <SelectValue placeholder="Select Payment Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADD_MONEY">
                              Deposit Money
                            </SelectItem>
                            <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                          </SelectContent>
                        </Select>
                        {withdrawForm.formState.errors.type && (
                          <p className="text-destructive text-xs mt-1">
                            {withdrawForm.formState.errors.type.message?.toString()}
                          </p>
                        )}
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
                                BDT {withdrawForm.watch("amount") || 0}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Fee</span>
                              <strong>
                                BDT{" "}
                                {
                                  calculateFee(
                                    withdrawForm.watch("amount") || 0,
                                    "WITHDRAW"
                                  ).fee
                                }
                              </strong>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <span>Total Amount</span>
                              <strong>
                                BDT{" "}
                                {
                                  calculateFee(
                                    withdrawForm.watch("amount") || 0,
                                    "WITHDRAW"
                                  ).totalAmount
                                }
                              </strong>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() =>
                            withdrawForm.reset({
                              identifier: "",
                              amount: 0,
                            })
                          }
                        >
                          Reset
                        </Button>
                        <Button type="submit">Withdraw</Button>
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
