import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

const FAQHelp = () => {
  const navigate = useNavigate();

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* Support Card */}
        <Card className="bg-primary text-primary-foreground overflow-hidden relative group rounded-2xl border-none shadow-none shadow-primary/20">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <CardContent className="p-8 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Still need help?</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
              Can't find what you're looking for? Join our live support session
              or talk to our experts.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() =>
                  window.open(
                    "https://meet.google.com/med-fpru-gyg?fbclid=IwY2xjawKhDWVleHRuA2FlbQIxMABicmlkETFSSWNtWlVxOTRERkJkMXpoAR6eeZ3Go3JzqYPJO3HGR7pyhmQ87ZYlAc3kBj9fQdYtOygAKdcqxaOJaS054w_aem_VPFs57xgzt-UD3Ib8jKg5w",
                    "_blank"
                  )
                }
                className="w-full bg-white text-primary hover:bg-gray-100 font-bold h-12 rounded-lg"
              >
                Join Support Meet
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                variant="ghost"
                className="w-full text-white hover:bg-white/10 font-semibold"
              >
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Card */}
        <Card className="rounded-xl border-border bg-card/50 backdrop-blur-sm shadow-none">
          <CardContent className="p-6 space-y-6">
            <h4 className="font-bold text-foreground">Quick Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    +880 123 456 789
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Email
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    support@neopay.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default FAQHelp;
