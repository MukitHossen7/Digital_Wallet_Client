import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
};

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I register as a user or agent?",
    answer: (
      <div>
        <p className="mb-2">
          Go to the <strong>Register</strong> page and choose <em>User</em> or{" "}
          <em>Agent</em> from the role dropdown. You’ll need to verify email
          during login. After login:
        </p>
        <ul className="ml-5 list-disc">
          <li>Users can log in immediately and access their wallet.</li>
          <li>
            Agents may require admin approval before performing cash-in
            operations.
          </li>
        </ul>
      </div>
    ),
    category: "Account",
  },
  {
    id: "faq-2",
    question: "How can I add money to a user's wallet as an agent?",
    answer: (
      <div>
        <p className="mb-2">
          Agents can perform cash-in (add money) using the{" "}
          <strong>Agent Dashboard &gt; Add Money</strong> flow.
        </p>
        <p className="mb-0">
          Make sure you’re approved and your agent profile has sufficient
          permissions.
        </p>
      </div>
    ),
    category: "Agent",
  },
  {
    id: "faq-3",
    question: "What are the transaction fees and limits?",
    answer: (
      <div>
        <p className="mb-2">
          Fees and limits depend on the transaction type and user role. Check{" "}
          <strong>Settings &gt; Fees</strong> for current values.
        </p>
        <p className="text-sm text-muted-foreground">
          Admins can adjust fees from the Admin Dashboard.
        </p>
      </div>
    ),
    category: "General",
  },
  {
    id: "faq-4",
    question: "How do I report a suspicious transaction?",
    answer: (
      <div>
        <p className="mb-2">
          Open the transaction details and click <strong>Report</strong>.
          Provide the reason and any evidence. Our compliance team will review
          the report.
        </p>
      </div>
    ),
    category: "Security",
  },
  {
    id: "faq-5",
    question: "How do I reset my password?",
    answer: (
      <div>
        <p className="mb-2">
          Use the <strong>Forgot password</strong> link on the login page.
          You’ll receive a password reset code on your registered phone or
          email.
        </p>
      </div>
    ),
    category: "Account",
  },
];

const AccordionItem: React.FC<{
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="rounded-lg border">
      <button
        aria-expanded={isOpen}
        aria-controls={`${faq.id}-panel`}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div>
          <h4 className="text-base font-semibold">{faq.question}</h4>
          <p className="text-sm text-muted-foreground mt-1 hidden md:block">
            {faq.category}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${faq.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden px-4 pb-4 pt-0"
          >
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQAccordion = () => {
  const [faqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [openId, setOpenId] = useState<string | null>(DEFAULT_FAQS[0].id);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");

  const categories = Array.from(
    new Set(faqs.map((f) => f.category || "General"))
  );

  const filtered = faqs.filter((f) => {
    const matchQuery = [f.question, String(f.answer)]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchCategory =
      categoryFilter === "all" ? true : f.category === categoryFilter;
    return matchQuery && matchCategory;
  });
  return (
    <div>
      <section>
        <Card className="border-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filters</CardTitle>
            <CardDescription>
              Find answers quickly using search, category filters or browse the
              list below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                aria-label="Search FAQs"
              />
              <div className="mt-2 sm:mt-0 sm:ml-3 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear
                </Button>
                <Button
                  onClick={() =>
                    setOpenId(filtered.length ? filtered[0].id : null)
                  }
                >
                  Open First
                </Button>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`rounded-full px-3 py-1 text-sm ${
                  categoryFilter === "all"
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "border"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    categoryFilter === c
                      ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
                      : "border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {filtered.length === 0 && (
                <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
                  No results found for "{query}"
                </div>
              )}

              {filtered.map((f) => (
                <AccordionItem
                  key={f.id}
                  faq={f}
                  isOpen={openId === f.id}
                  onToggle={() => setOpenId(openId === f.id ? null : f.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FAQAccordion;
