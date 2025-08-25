import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ActionCard = ({ title, description, icon, onClick }: IProps) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ActionCard;
