import { motion } from "framer-motion";
import { Check, Minus, Info } from "lucide-react";

type PlanStatus = "yes" | "no" | string;

interface FeatureRow {
  name: string;
  basic: PlanStatus;
  pro: PlanStatus;
  enterprise: PlanStatus;
  description?: string;
}

const features: FeatureRow[] = [
  {
    name: "Wallet Creation",
    basic: "yes",
    pro: "yes",
    enterprise: "yes",
    description: "Create and manage your digital wallet",
  },
  {
    name: "Send Money Limit",
    basic: "$500/mo",
    pro: "$5,000/mo",
    enterprise: "Unlimited",
    description: "Maximum amount you can send per month",
  },
  {
    name: "Priority Support",
    basic: "no",
    pro: "yes",
    enterprise: "yes",
    description: "Get faster response from our team",
  },
  {
    name: "Analytics Dashboard",
    basic: "Basic",
    pro: "Advanced",
    enterprise: "Real-time",
    description: "Detailed insights into your spending",
  },
  {
    name: "Dedicated Manager",
    basic: "no",
    pro: "no",
    enterprise: "yes",
    description: "A personal manager for your account",
  },
  {
    name: "Multi-currency Support",
    basic: "no",
    pro: "yes",
    enterprise: "yes",
  },
  { name: "API Access", basic: "no", pro: "no", enterprise: "yes" },
  { name: "Cashback Rewards", basic: "1%", pro: "3%", enterprise: "5%" },
];

const RenderStatus = ({
  status,
  isPro,
}: {
  status: PlanStatus;
  isPro?: boolean;
}) => {
  if (status === "yes")
    return (
      <Check
        className={`mx-auto w-5 h-5 ${
          isPro ? "text-primary-foreground" : "text-primary"
        }`}
        strokeWidth={3}
      />
    );
  if (status === "no")
    return <Minus className="mx-auto w-5 h-5 text-muted-foreground/40" />;
  return (
    <span
      className={`text-sm font-semibold ${
        isPro ? "text-primary-foreground" : "text-foreground"
      }`}
    >
      {status}
    </span>
  );
};

const FeatureComparison = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest uppercase text-xs"
          >
            Deep Dive
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-2"
          >
            Compare our plans
          </motion.h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Find the perfect plan that fits your financial goals and transaction
            needs.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="relative mt-8 group">
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-none shadow-primary/5">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-muted/50 dark:bg-muted/20">
                  <th className="py-6 px-6 text-left text-sm font-bold text-foreground w-1/3">
                    Features & Capabilities
                  </th>
                  <th className="py-6 px-4 text-center text-sm font-bold text-foreground">
                    Basic
                  </th>
                  <th className="py-6 px-4 text-center text-sm font-bold bg-primary text-primary-foreground relative">
                    Pro
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chart-2 text-[10px] text-black px-2 py-0.5 rounded-full uppercase tracking-tighter font-black">
                      Popular
                    </span>
                  </th>
                  <th className="py-6 px-4 text-center text-sm font-bold text-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {features.map((feature, idx) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-primary/5 transition-colors group/row"
                  >
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground group-hover/row:text-primary transition-colors">
                          {feature.name}
                        </span>
                        {feature.description && (
                          <span className="text-xs text-muted-foreground mt-1 hidden md:block italic">
                            {feature.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <RenderStatus status={feature.basic} />
                    </td>
                    <td className="py-5 px-4 text-center bg-primary/5 dark:bg-primary/10 border-x border-primary/20">
                      <RenderStatus status={feature.pro} />
                    </td>
                    <td className="py-5 px-4 text-center">
                      <RenderStatus status={feature.enterprise} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-8 px-6"></td>
                  <td className="py-8 px-4 text-center">
                    <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
                      Get Basic
                    </button>
                  </td>
                  <td className="py-8 px-4 text-center bg-primary/5 dark:bg-primary/10 border-x border-primary/20">
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                      Start Free Trial
                    </button>
                  </td>
                  <td className="py-8 px-4 text-center">
                    <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
                      Contact Sales
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Hint */}
          <div className="md:hidden text-center mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs italic">
            <Info className="w-3 h-3" /> Swipe left to see all plans
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;
