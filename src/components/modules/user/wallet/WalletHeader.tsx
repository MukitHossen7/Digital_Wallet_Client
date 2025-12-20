// import { Badge } from "@/components/ui/badge";
// import { Sparkles, Wallet } from "lucide-react";

import { Wallet, Zap } from "lucide-react";

// const WalletHeader = () => {
//   return (
//     <div className="flex items-start justify-between gap-4">
//       <div className="space-y-2" data-tour="title">
//         <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-1 text-sm">
//           <Sparkles className="h-4 w-4" />
//           <span>Fast • Secure • Reliable</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
//           <Wallet className="h-7 w-7 text-primary" /> Wallet
//         </h1>
//         <p className="text-muted-foreground max-w-prose">
//           Manage your wallet balance and transactions.
//         </p>
//       </div>
//       <div className="hidden md:flex items-center gap-2">
//         <Badge className="rounded-full text-green-500 bg-green-200">
//           Active
//         </Badge>
//       </div>
//     </div>
//   );
// };

// export default WalletHeader;

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
