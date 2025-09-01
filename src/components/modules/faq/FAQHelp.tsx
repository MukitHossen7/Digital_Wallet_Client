import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

const FAQHelp = () => {
  const navigate = useNavigate();
  const handleSupport = () => {
    window.open(
      "https://meet.google.com/med-fpru-gyg?fbclid=IwY2xjawKhDWVleHRuA2FlbQIxMABicmlkETFSSWNtWlVxOTRERkJkMXpoAR6eeZ3Go3JzqYPJO3HGR7pyhmQ87ZYlAc3kBj9fQdYtOygAKdcqxaOJaS054w_aem_VPFs57xgzt-UD3Ib8jKg5w",
      "_blank"
    );
  };
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-20 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Contact support or access guides.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              If you still can't find an answer, open a support or contact
              support team.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={handleSupport}>Go To Support</Button>
              <Button onClick={() => navigate("/contact")} variant="ghost">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Phone: <strong>+8801326153447</strong>
            </p>
            <p className="text-sm">
              Email: <strong>hossenmukit7@gmail.com</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default FAQHelp;
