/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
import { SquarePen } from "lucide-react";

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

  async function onSubmitAgentProfile(values: ProfileForm) {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing update profile...");
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (image) {
        formData.append("file", image as File);
      }

      const res = await updateUserProfile(formData).unwrap();
      if (res.success) {
        toast.success("Update Profile Successfully", { id: toastId });
      } else {
        toast.error("Update Profile Failed", { id: toastId });
      }
    } catch (error: any) {
      if (toastId) {
        toast.error(error?.data?.message, { id: toastId });
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <SquarePen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make your profile look professional.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={profileForm.handleSubmit(onSubmitAgentProfile)}
          className="space-y-4"
        >
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="mt-1"
                    {...profileForm.register("name")}
                  />
                  {profileForm.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +88
                    </span>
                    <Input
                      id="phone"
                      placeholder="17XXXXXXXX"
                      className="pl-12"
                      {...profileForm.register("phone")}
                    />
                  </div>
                  {profileForm.formState.errors.phone && (
                    <p className="text-red-500 text-sm">
                      {profileForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Your address"
                  className="mt-1"
                  {...profileForm.register("address")}
                />
                {profileForm.formState.errors.address && (
                  <p className="text-red-500 text-sm">
                    {profileForm.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-1">Profile Image</Label>
                <SingleImageUploader onChange={setImage} />
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
