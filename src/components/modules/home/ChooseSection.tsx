import {
  DollarSign,
  Shield,
  Smartphone,
  Users,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Users,
    title: "Trusted by 10,000+",
    desc: "A rapidly growing community of satisfied users across the nation.",
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: DollarSign,
    title: "Low Transaction Fees",
    desc: "Transparency is key. Send & receive money with zero hidden costs.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    desc: "Your data is encrypted with industry-leading AES-256 protection.",
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Smartphone,
    title: "Multi-Device Support",
    desc: "Native experience on iOS, Android, and all modern web browsers.",
    accent: "bg-purple-500/10 text-purple-600",
  },
];

const ChooseSection = () => {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content: Title and Subtext */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>NeoPay Advantage</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Why thousands of users <br />
              <span className="text-primary">choose NeoPay</span> every day.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              We provide a secure, scalable and user-friendly platform. Whether
              you are an individual or an agent, NeoPay makes your financial
              journey easier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Joined by{" "}
                <span className="text-foreground font-bold">2,400+</span> new
                users this week
              </p>
            </motion.div>
          </div>

          {/* Right Content: Feature Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {reasons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300 ${item.accent}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseSection;
