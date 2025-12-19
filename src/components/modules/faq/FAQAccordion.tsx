import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, FilterX, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FAQ = {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: string;
};

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I register as a user or agent?",
    category: "Account",
    answer: (
      <div className="space-y-3">
        <p>
          Go to the <strong className="text-primary">Register</strong> page and
          choose <em>User</em> or <em>Agent</em> from the role dropdown.
        </p>
        <ul className="grid gap-2 ml-4">
          <li className="flex gap-2 items-start text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>
              Users can access their wallet immediately after email
              verification.
            </span>
          </li>
          <li className="flex gap-2 items-start text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>
              Agents require a manual document review and admin approval.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "faq-2",
    question: "How can I add money as an agent?",
    category: "Agent",
    answer:
      "Agents can perform cash-in via the Dashboard. Ensure your wallet has sufficient balance and your account status is 'Approved'.",
  },
  {
    id: "faq-3",
    question: "What are the transaction fees?",
    category: "General",
    answer:
      "Transaction fees vary by role. Check 'Settings > Fees' for real-time values. Basic users enjoy lower fees for small transfers.",
  },
  {
    id: "faq-4",
    question: "How do I report a suspicious transaction?",
    category: "Security",
    answer:
      "Go to your transaction history, select the transaction, and click 'Report Fraud'. Our 24/7 security team will review it instantly.",
  },
  {
    id: "faq-5",
    question: "How do I reset my password?",
    category: "Account",
    answer:
      "Click 'Forgot Password' on the login screen. We will send a secure 6-digit verification code to your registered email.",
  },
];

const AccordionItem: React.FC<{
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => {
  return (
    <motion.div
      layout
      className={`group rounded-xl border transition-all duration-300 ${
        isOpen
          ? "border-primary bg-primary/[0.03] dark:bg-primary/[0.05] shadow-sm"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
            {faq.category}
          </span>
          <h4
            className={`text-base md:text-lg font-bold transition-colors ${
              isOpen
                ? "text-primary"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {faq.question}
          </h4>
        </div>
        <div
          className={`p-2 rounded-xl transition-all duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground rotate-180"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-sm md:text-base leading-relaxed text-muted-foreground border-t border-border/50 mt-2 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_FAQS[0].id);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(DEFAULT_FAQS.map((f) => f.category))),
  ];

  const filtered = DEFAULT_FAQS.filter((f) => {
    const matchQuery = f.question
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchCategory =
      categoryFilter === "all" ? true : f.category === categoryFilter;
    return matchQuery && matchCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      {/* Search & Filter Section */}
      <Card className="border-none bg-secondary/40 dark:bg-secondary/10 backdrop-blur-sm rounded-lg p-2 shadow-none">
        <CardContent className="p-4 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
              <Input
                placeholder="Search for answers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 h-12 bg-background border-none focus-visible:ring-1 shadow-none"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategoryFilter("all");
                }}
                className="h-12 border-border bg-background hover:bg-secondary shadow-none"
              >
                <FilterX className="w-4 h-4 mr-2" /> Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-tight ${
                  categoryFilter === c
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "bg-background text-muted-foreground border border-border hover:border-primary/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accordion List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center rounded-lg border border-dashed border-border flex flex-col items-center gap-3"
            >
              <div className="p-4 rounded-full bg-secondary">
                <HelpCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-foreground font-bold">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            </motion.div>
          ) : (
            filtered.map((f) => (
              <AccordionItem
                key={f.id}
                faq={f}
                isOpen={openId === f.id}
                onToggle={() => setOpenId(openId === f.id ? null : f.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Stats/Hint */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-foreground">{filtered.length}</span>{" "}
          results
          {categoryFilter !== "all" && (
            <span>
              {" "}
              in{" "}
              <span className="text-primary font-bold">
                {categoryFilter}
              </span>{" "}
              category
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default FAQAccordion;
