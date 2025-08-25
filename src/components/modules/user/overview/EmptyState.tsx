import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle className="text-base">No recent transactions</CardTitle>
        <CardDescription>
          Start by depositing money or sending to a contact.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/user/wallet/?tab=deposit")}>
            Deposit
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/user/wallet/?tab=send")}
          >
            Send Money
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmptyState;
