import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, DollarSign, UserPlus } from "lucide-react";

const WorksSection = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            NeoPay makes managing your money simple and secure. Follow these
            easy steps to sign up, add money, send funds, and track all your
            transactions in real-time.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: UserPlus,
                title: "Sign Up & Verify",
                desc: "Create an account and verify your identity.",
              },
              {
                icon: DollarSign,
                title: "Add / Send Money",
                desc: "Top up your wallet or transfer funds easily.",
              },
              {
                icon: BarChart,
                title: "Track Transactions",
                desc: "Stay updated with real-time transaction history.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full shadow-md rounded-xl hover:shadow-lg flex flex-col items-center p-6 transition">
                  <item.icon className="w-10 h-10 text-indigo-600" />

                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksSection;
