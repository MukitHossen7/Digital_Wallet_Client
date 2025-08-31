import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Globe, Shield, Users } from "lucide-react";

const MissionSection = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            We aim to make digital finance secure, affordable, accessible, and
            trusted by everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Security First",
              desc: "Ensuring bank-level security for all transactions.",
            },
            {
              icon: DollarSign,
              title: "Affordable",
              desc: "Low transaction fees for all users.",
            },
            {
              icon: Globe,
              title: "Accessible",
              desc: "Financial services accessible from anywhere.",
            },
            {
              icon: Users,
              title: "Trusted",
              desc: "A growing community of satisfied users.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className=""
            >
              <Card className="h-full flex flex-col justify-center rounded-xl shadow-md hover:shadow-lg transition">
                <CardHeader className="flex flex-col items-center text-center space-y-2 flex-grow">
                  <item.icon className="w-10 h-10 text-indigo-600" />
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MissionSection;
