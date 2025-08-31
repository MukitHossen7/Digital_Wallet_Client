import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Headphones, Shield, Wallet, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Instant Transfer",
                icon: Zap,
                desc: "Send money instantly with just one click.",
              },
              {
                title: "Secure Transactions",
                icon: Shield,
                desc: "Protected by bank-level security.",
              },
              {
                title: "Wallet & Agent System",
                icon: Wallet,
                desc: "Deposit, withdraw & manage money easily.",
              },
              {
                title: "24/7 Support",
                icon: Headphones,
                desc: "We are here to help anytime.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full shadow-md rounded-xl">
                  <CardHeader>
                    <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
