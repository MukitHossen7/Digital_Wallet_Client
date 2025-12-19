import { motion } from "framer-motion";
import { Headphones, Shield, Wallet, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Instant Transfer",
    icon: Zap,
    desc: "Send money instantly with just one click to any account, anytime, anywhere.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Secure Transactions",
    icon: Shield,
    desc: "Protected by bank-level encryption and multi-factor authentication systems.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Wallet & Agent System",
    icon: Wallet,
    desc: "Easy cash-in and cash-out via our extensive network of certified agents.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "24/7 Support",
    icon: Headphones,
    desc: "Our dedicated support team is available around the clock to help you out.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase"
          >
            Why Choose NeoPay
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Everything you need for <br className="hidden md:block" />
            <span className="text-primary">Smarter Payments</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Join millions of users who trust NeoPay for their daily financial
            needs. Fast, secure, and always reliable.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl border bg-card hover:bg-card/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20"
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[360deg]",
                  item.bgColor
                )}
              >
                <item.icon className={cn("w-7 h-7", item.color)} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                {item.desc}
              </p>

              {/* Bottom Action (Optional but looks professional) */}
              <div className="mt-6 flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                <span>Read more</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>

              {/* Decorative Corner Gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
