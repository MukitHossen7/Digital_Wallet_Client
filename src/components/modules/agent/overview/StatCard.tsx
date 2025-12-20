import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface IProps {
  title: string;
  value: string | null;
  icon: React.ReactNode;
  hint?: string;
  color?: "emerald" | "rose" | "primary";
  loading?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  hint,
  color = "primary",
  loading = false,
}: IProps) => {
  const colorVariants: Record<string, string> = {
    emerald:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  const iconGradients: Record<string, string> = {
    emerald: "from-emerald-500 to-emerald-700",
    rose: "from-rose-500 to-rose-700",
    primary: "from-primary to-primary-foreground/20",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 border-none shadow-sm shadow-black/5 bg-card/60 backdrop-blur-md rounded-[2rem] relative overflow-hidden group">
        {/* Decorative background circle */}
        <div
          className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 ${colorVariants[color]}`}
        />

        <div className="flex items-center gap-5">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg ${iconGradients[color]} text-white transition-transform group-hover:rotate-6`}
          >
            {icon}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-[0.1em] text-muted-foreground/70">
              {title}
            </div>
            <div className="text-2xl font-bold tracking-tight flex items-baseline gap-1">
              {loading ? <Skeleton className="h-8 w-32 rounded-lg" /> : value}
            </div>
          </div>
        </div>

        {hint && (
          <div className="mt-5 flex items-center justify-between">
            <div
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${colorVariants[color]}`}
            >
              {hint}
            </div>
            <div className="h-1 w-12 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full w-full ${
                  color === "emerald"
                    ? "bg-emerald-500"
                    : color === "rose"
                    ? "bg-rose-500"
                    : "bg-primary"
                }`}
              />
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default StatCard;
