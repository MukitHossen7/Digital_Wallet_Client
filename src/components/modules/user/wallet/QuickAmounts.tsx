import { Button } from "@/components/ui/button";

interface IProps {
  onPick: (n: number) => void;
}

const QuickAmounts = ({ onPick }: IProps) => {
  const presets = [500, 1000, 2000, 5000, 10000];
  return (
    <div className="flex flex-wrap gap-2" data-tour="quick-amounts">
      {presets.map((price) => (
        <Button
          key={price}
          type="button"
          variant="secondary"
          className="rounded-full cursor-pointer"
          onClick={() => onPick(price)}
          size="sm"
        >
          BDT {price}
        </Button>
      ))}
    </div>
  );
};

export default QuickAmounts;
