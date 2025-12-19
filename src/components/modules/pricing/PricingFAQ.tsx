import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time from your dashboard. If you upgrade, the prorated difference will be charged; if you downgrade, you'll receive credit towards your next billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 14-day money-back guarantee for our Pro and Enterprise plans. If you're not satisfied, simply contact our support team and we'll process your refund, no questions asked.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No. Transparency is our priority. All transaction fees and subscription costs are clearly outlined in our pricing table. You only pay for what you use.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Security is built into our core. We use bank-grade AES-256 encryption and follow strict PCI-DSS compliance standards to ensure your data and money are always protected.",
  },
  {
    question: "What happens if I exceed my monthly limit?",
    answer:
      "For Basic and Pro users, if you reach your limit, you can still receive money, but outgoing transactions will be paused until the next month or until you upgrade your plan.",
  },
];

const PricingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-2"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Everything you need to know about our pricing and services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary bg-card shadow-lg shadow-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-bold transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 ml-4 p-1 rounded-full ${
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-8 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center p-8 rounded-xl bg-secondary/30 border border-border"
        >
          <p className="text-foreground font-medium">Still have questions?</p>
          <p className="text-muted-foreground text-sm mt-1">
            We're here to help you 24/7.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:scale-105 transition-transform active:scale-95"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
