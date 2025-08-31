import { Badge } from "@/components/ui/badge";

const FeaturesHeader = () => {
  return (
    <section className="text-center mb-12">
      <Badge className="mx-auto mb-2 rounded-full">Features</Badge>
      <h1 className="text-2xl md:text-4xl  font-bold">Features NeoPay</h1>
      <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
        Secure, role-based, and scalable features built for users, agents, and
        admins. Real-world workflows, bank-level security, and mobile-first
        experience.
      </p>
    </section>
  );
};

export default FeaturesHeader;
