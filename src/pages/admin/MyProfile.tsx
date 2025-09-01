/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import meImg from "../../assets/images/panda.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "@/redux/features/auth/auth.api";
import SingleImageUploader from "@/components/SingleImageUploader";
import { toast } from "sonner";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
import { Helmet } from "react-helmet";

// -------------------- Validation --------------------
const profileSchema = z.object({
  name: z.string().min(2, { error: "Name is Required" }).max(50),
  phone: z
    .string()
    .min(10, { error: "Enter a valid phone number" })
    .max(20)
    .regex(
      /^(?:\+?88)?01[3-9][0-9]{8}$/,
      "Enter a valid Bangladeshi phone (e.g. 017XXXXXXXX)"
    ),
  address: z.string().min(2, { error: "Address is Required" }),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Include at least one digit")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
    confirmPassword: z
      .string()
      .min(1, { error: "Confirm Password is Required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function MyProfile() {
  const [changePassword] = useChangePasswordMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { data: adminData, isLoading: adminLoading } = useGetMeQuery(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (adminData?.data) {
      profileForm.reset({
        name: adminData.data.name ?? "",
        phone: adminData.data.phone ?? "",
        address: adminData.data.address ?? "",
      });
    }
  }, [adminData, profileForm]);

  async function onSubmitProfile(values: ProfileForm) {
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

  async function onSubmitPassword(values: PasswordForm) {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing change password...");
      const passwordData = {
        newPassword: values?.newPassword,
        oldPassword: values?.currentPassword,
      };
      const res = await changePassword(passwordData).unwrap();
      if (res.success) {
        toast.success("Change password Successfully", { id: toastId });
        passwordForm.reset();
      } else {
        toast.error("Change password Failed", { id: toastId });
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
    <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>Dashboard - Profile</title>
        <meta name="description" content="This is Profile Page" />
      </Helmet>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" /> Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your name, phone, password and profile image.
          </p>
        </div>
        <div className="text-sm text-muted-foreground hidden lg:block">
          Last updated:{" "}
          <span className="font-medium">
            {adminData?.data?.updatedAt
              ? new Date(adminData.data.updatedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 space-y-6 xl:space-y-0 xl:gap-6">
        {/* Left side */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Personal details & avatar</CardDescription>
          </CardHeader>

          <CardContent>
            {adminLoading || !adminData?.data ? (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={adminData?.data?.picture || meImg}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = meImg;
                  }}
                  className="h-28 w-28 rounded-full ring-1 object-cover object-center"
                />

                <div className="w-full space-y-2 text-center">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">
                    {adminData?.data?.name ?? "N/A"}
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Email
                  </div>
                  <div className="font-medium">
                    {adminData?.data?.email ?? "N/A"}
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Phone
                  </div>
                  <div className="font-medium">
                    {adminData?.data?.phone ?? "N/A"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Address
                  </div>
                  <div className="font-medium">
                    {adminData?.data?.address ?? "N/A"}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Forms */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update profile</CardTitle>
              <CardDescription>
                Change your profile to make it look better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={profileForm.handleSubmit(onSubmitProfile)}
                className="space-y-4"
              >
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full name */}
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...profileForm.register("name")}
                      className="rounded-md mt-1 w-full"
                    />
                    {profileForm.formState.errors.name && (
                      <p className="text-destructive text-xs mt-1">
                        {profileForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        +88
                      </span>
                      <Input
                        id="phone"
                        placeholder="17XXXXXXXX"
                        className="pl-12 rounded-md w-full"
                        {...profileForm.register("phone")}
                      />
                    </div>
                    {profileForm.formState.errors.phone && (
                      <p className="text-destructive text-xs mt-1">
                        {profileForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address full width */}
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your Address"
                    {...profileForm.register("address")}
                    className="rounded-md mt-1 w-full"
                  />
                  {profileForm.formState.errors.address && (
                    <p className="text-destructive text-xs mt-1">
                      {profileForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <SingleImageUploader onChange={setImage} />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 justify-end">
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="grid grid-cols-1 gap-4"
              >
                <div>
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="********"
                    {...passwordForm.register("currentPassword")}
                    className="rounded-md mt-1"
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-destructive text-xs mt-1">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 chars, 1 uppercase, 1 digit"
                      {...passwordForm.register("newPassword")}
                      className="rounded-md mt-1"
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat new password"
                      {...passwordForm.register("confirmPassword")}
                      className="rounded-md mt-1"
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="show"
                    type="checkbox"
                    className="h-4 w-4"
                    checked={showPassword}
                    onChange={() => setShowPassword((show) => !show)}
                  />
                  <label
                    htmlFor="show"
                    className="text-sm text-muted-foreground"
                  >
                    Show passwords
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => passwordForm.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Change password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
