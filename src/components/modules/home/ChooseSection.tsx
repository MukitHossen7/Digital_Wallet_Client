import { DollarSign, Shield, Smartphone, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const ChooseSection = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">
            Why Choose NeoPay?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            We provide a secure, scalable and user-friendly platform trusted by
            thousands of users. Whether you are an individual, agent, or
            business, NeoPay makes your financial journey easier.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Trusted by 10,000+",
                desc: "A rapidly growing community of satisfied users.",
              },
              {
                icon: DollarSign,
                title: "Low Transaction Fees",
                desc: "Send & receive money at the lowest possible cost.",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                desc: "Your money and data are safe with industry-standard protection.",
              },
              {
                icon: Smartphone,
                title: "Multi-Device Support",
                desc: "Access NeoPay anytime from mobile, tablet, or desktop.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full shadow-md rounded-xl hover:shadow-lg flex flex-col items-center p-6 transition">
                  <item.icon className="w-10 h-10 text-indigo-600" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-400  text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseSection;
