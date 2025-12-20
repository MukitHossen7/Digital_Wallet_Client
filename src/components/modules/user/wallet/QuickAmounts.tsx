/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";

import { Button } from "@/components/ui/button";

// interface IProps {
//   onPick: (n: number) => void;
// }

// const QuickAmounts = ({ onPick }: IProps) => {
//   const presets = [500, 1000, 2000, 5000, 10000];
//   return (
//     <div className="flex flex-wrap gap-2" data-tour="quick-amounts">
//       {presets.map((price) => (
//         <Button
//           key={price}
//           type="button"
//           variant="secondary"
//           className="rounded-full cursor-pointer"
//           onClick={() => onPick(price)}
//           size="sm"
//         >
//           BDT {price}
//         </Button>
//       ))}
//     </div>
//   );
// };

// export default QuickAmounts;
export const QuickAmounts = ({ onPick }: any) => {
  const presets = [500, 1000, 2000, 5000, 10000];
  return (
    <div className="flex flex-wrap gap-3" data-tour="quick-amounts">
      {presets.map((price) => (
        <Button
          key={price}
          type="button"
          variant="outline"
          className="rounded-2xl px-4  text-lg hover:bg-primary hover:text-white hover:border-primary border-border/60 transition-all active:scale-90 shadow-none bg-card"
          onClick={() => onPick(price)}
        >
          ৳{price.toLocaleString()}
        </Button>
      ))}
    </div>
  );
};
