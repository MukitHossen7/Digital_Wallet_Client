import { Wallet, Zap } from "lucide-react";

export const WalletHeader = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
    <div className="space-y-3" data-tour="title">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-black text-primary uppercase tracking-widest border border-primary/10">
        <Zap className="h-3 w-3" />
        <span>Fast & Secure Payments</span>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-4">
        <div className="bg-primary p-3 rounded-[1.2rem] text-white shadow-xl shadow-primary/20">
          <Wallet className="h-4 w-4" />
        </div>
        My Wallet
      </h1>
      <p className="text-muted-foreground font-medium max-w-lg leading-relaxed">
        Manage your funds with ease. Deposit, withdraw or transfer money
        instantly to any verified account.
      </p>
    </div>
    <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-2xl border border-border shadow-none">
      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Server: Online
      </span>
    </div>
  </div>
);
