/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import SingleImageUploader from "@/components/SingleImageUploader";
import {
  SquarePen,
  User,
  Phone,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name is Required").max(50),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(/^(?:\+?88)?01[3-9][0-9]{8}$/, "Enter a valid Bangladeshi phone"),
  address: z.string().min(2, "Address is Required"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfileModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { data: userData } = useGetMeQuery(null);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  useEffect(() => {
    if (userData?.data) {
      profileForm.reset({
        name: userData.data.name ?? "",
        phone: userData.data.phone ?? "",
        address: userData.data.address ?? "",
      });
    }
  }, [userData, profileForm]);

  const onSubmit = async (values: ProfileForm) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Updating profile...");
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (image) formData.append("file", image as File);

      const res = await updateUserProfile(formData).unwrap();
      if (res.success)
        toast.success("Profile updated successfully!", { id: toastId });
      else toast.error("Profile update failed!", { id: toastId });
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-4 rounded-lg border-primary/30 hover:bg-primary hover:text-white transition-all font-bold gap-2 shadow-sm active:scale-95"
        >
          <SquarePen className="w-4 h-4" />
          <span className="hidden xs:inline">Edit Profile</span>
        </Button>
      </DialogTrigger>

      {/* Dialog Content with Responsive Width */}
      <DialogContent className="w-[95vw] sm:max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Top Accent Bar */}
        <div className="bg-primary h-2 w-full shrink-0" />

        <div className="overflow-y-auto p-5 sm:p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle className="text-xl md:text-2xl  tracking-tight text-foreground">
                Update Profile
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary/60" />
              Make your profile look professional.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={profileForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Grid Layout for Desktop, Single Column for Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-2.5">
                <Label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5"
                >
                  <User className="h-3 w-3" /> Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Rahman Kabir"
                  className="h-12 rounded-xl bg-muted/30 border-border/40 focus:ring-primary/20 font-semibold transition-all"
                  {...profileForm.register("name")}
                />
                {profileForm.formState.errors.name && (
                  <p className="text-destructive text-[10px] font-black uppercase tracking-tighter mt-1 ml-1 animate-in slide-in-from-left-2">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5"
                >
                  <Phone className="h-3 w-3" /> Mobile Number
                </Label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground group-focus-within:text-primary transition-colors">
                    +88
                  </span>
                  <Input
                    id="phone"
                    placeholder="01712345678"
                    className="h-12 pl-12 rounded-xl bg-muted/30 border-border/40 focus:ring-primary/20 font-semibold transition-all"
                    {...profileForm.register("phone")}
                  />
                </div>
                {profileForm.formState.errors.phone && (
                  <p className="text-destructive text-[10px] font-black uppercase tracking-tighter mt-1 ml-1 animate-in slide-in-from-left-2">
                    {profileForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="address"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5"
              >
                <MapPin className="h-3 w-3" /> Address
              </Label>
              <Input
                id="address"
                placeholder="Ex: House 12, Road 5, Dhaka"
                className="h-12 rounded-xl bg-muted/30 border-border/40 focus:ring-primary/20 font-semibold transition-all"
                {...profileForm.register("address")}
              />
              {profileForm.formState.errors.address && (
                <p className="text-destructive text-[10px] font-black uppercase tracking-tighter mt-1 ml-1 animate-in slide-in-from-left-2">
                  {profileForm.formState.errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1.5">
                <ImageIcon className="h-3 w-3" /> Profile Image
              </Label>
              <div className="p-4 sm:p-6 rounded-2xl bg-muted/20 border-2 border-dashed border-border group-hover:border-primary/40 transition-all hover:bg-primary/5">
                <SingleImageUploader onChange={setImage} />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 sm:pt-4 border-t border-border/10 mt-6">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="h-10 rounded-lg font-bold order-2 sm:order-1 text-muted-foreground hover:bg-muted"
                >
                  Discard
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="h-10 px-8 rounded-lg font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all order-1 sm:order-2 bg-primary text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
