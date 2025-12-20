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
      className="group relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 active:scale-95 border-border/50 rounded-2xl cursor-pointer overflow-hidden"
    >
      <CardHeader className="p-6">
        <div className="h-14 w-14 mb-4 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <CardTitle className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm font-medium leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </Card>
  );
};
export default ActionCard;
