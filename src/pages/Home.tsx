/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/modules/home/HeroSection";
import FeaturesSection from "@/components/modules/home/FeaturesSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/*  Banner */}
      <HeroSection></HeroSection>
      {/* Features */}
      <FeaturesSection></FeaturesSection>
      {/* 🟢 Section 2: How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Sign Up & Verify",
                desc: "Create an account and verify your identity.",
              },
              {
                step: "2",
                title: "Add / Send Money",
                desc: "Top up your wallet or transfer funds easily.",
              },
              {
                step: "3",
                title: "Track Transactions",
                desc: "Stay updated with real-time transaction history.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white shadow-md p-6 rounded-2xl"
              >
                <div className="text-5xl font-bold text-indigo-600 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 Section 3: Why Choose Us */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose NeoPay?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Trusted by 10,000+ Users",
              "Low Transaction Fees",
              "Fast, Secure & Reliable",
              "Multi-device Support",
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-6 bg-white rounded-2xl shadow-md"
              >
                <p className="text-gray-700 font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 Section 4: Testimonials + CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Rahim",
                feedback: "NeoPay makes money transfer super easy and secure!",
              },
              {
                name: "Karim",
                feedback:
                  "I love the agent system, quick deposit and withdrawal anytime.",
              },
              {
                name: "Ayesha",
                feedback: "Very reliable and user-friendly digital wallet.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white shadow-md p-6 rounded-2xl"
              >
                <p className="text-gray-600 italic mb-4">“{item.feedback}”</p>
                <p className="font-semibold text-indigo-600">- {item.name}</p>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Join NeoPay Now
          </Button>
        </div>
      </section>
    </div>
  );
}
