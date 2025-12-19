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
        <section className="relative pb-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-[100%] blur-[120px]" />
          </div>

          <div className="container mx-auto">
            <div className="text-center mb-16">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Flexible Pricing
              </motion.div>

              {/* Titles */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1]"
              >
                Ready to scale your <br />
                <span className="text-primary italic">NeoPay</span> wallet?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Choose a plan that fits your personal or business needs. No
                hidden fees, cancel anytime.
              </motion.p>

              {/* Monthly/Yearly Toggle - Modern SaaS Style */}
              <div className="mt-12 flex justify-center items-center">
                <div className="bg-secondary/50 backdrop-blur-sm p-1.5 rounded-2xl border border-border flex items-center gap-2">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${
                      !isYearly
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-300 relative ${
                      isYearly
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Yearly
                    {/* Save Badge */}
                    <span
                      className={`absolute -top-3 -right-3 px-2 py-0.5 rounded-lg bg-chart-2 text-[10px] text-black font-black uppercase shadow-sm transition-opacity duration-300 ${
                        isYearly ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-xs text-muted-foreground/60 font-medium uppercase tracking-tighter"
              >
                Trusted by 50,000+ users worldwide
              </motion.p>
            </div>
          </div>
        </section>

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
