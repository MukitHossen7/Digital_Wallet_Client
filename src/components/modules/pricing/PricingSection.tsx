import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown } from "lucide-react";

type Tier = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
};

const tiers: Tier[] = [
  {
    name: "Basic",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For casual users to start sending & receiving money.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    features: [
      "Wallet creation",
      "Send money up to $500/month",
      "View transaction history",
      "Standard support",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 9.99,
    yearlyPrice: 99,
    description: "For regular users who want more transaction limits.",
    popular: true,
    icon: <Crown className="w-6 h-6 text-primary-foreground" />,
    features: [
      "All Basic features",
      "Send money up to $5,000/month",
      "Priority 24/7 support",
      "Access to analytics dashboard",
      "Zero fees on first 5 monthly txns",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 29.99,
    yearlyPrice: 299,
    description: "For businesses or high-volume users.",
    icon: <Shield className="w-6 h-6 text-primary" />,
    features: [
      "All Pro features",
      "Unlimited transactions",
      "Dedicated account manager",
      "Advanced reporting & Export",
      "Custom API Access",
    ],
  },
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wide uppercase text-sm"
          >
            Pricing Plans
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Choose the right plan for you
          </motion.h3>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing that grows with your financial needs.
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-secondary rounded-full p-1 transition-colors duration-300 focus:outline-none ring-2 ring-primary/20"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-lg"
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Yearly{" "}
              <span className="text-primary text-xs ml-1 font-bold">
                (Save 20%)
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                tier.popular
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-primary scale-105 z-10"
                  : "bg-card text-card-foreground border-border hover:border-primary/50 shadow-sm"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-xl">
                  Most Popular
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${
                  tier.popular ? "bg-white/20" : "bg-primary/10"
                }`}
              >
                {tier.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p
                className={`text-sm mb-6 ${
                  tier.popular
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {tier.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-black">
                  ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                </span>
                <span
                  className={`text-sm font-medium ${
                    tier.popular
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm font-medium"
                  >
                    <Check
                      className={`w-5 h-5 shrink-0 ${
                        tier.popular ? "text-white" : "text-primary"
                      }`}
                      strokeWidth={3}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 active:scale-95 ${
                  tier.popular
                    ? "bg-white text-primary hover:bg-opacity-90 shadow-lg shadow-black/10"
                    : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                }`}
              >
                Get Started Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <p className="text-center mt-12 text-muted-foreground text-sm italic">
          * Prices are in USD. No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
