import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    primary: "bg-primary/5 text-primary",
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]} shadow-sm`}
            >
              {icon}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{title}</div>
              <div className="text-xl font-semibold mt-1">
                {loading ? <Skeleton className="h-6 w-36" /> : value}
              </div>
            </div>
          </div>
          {hint && (
            <div className="text-xs text-muted-foreground mt-2">{hint}</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
