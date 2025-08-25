import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmptyState = () => {
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle className="text-base">No transactions found</CardTitle>
        <CardDescription>
          Try adjusting filters or extend the date range.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EmptyState;
