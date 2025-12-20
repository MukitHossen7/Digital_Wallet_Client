/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";

// import { Skeleton } from "@/components/ui/skeleton";

import {
  Camera,
  ShieldCheck,
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "@/redux/features/auth/auth.api";

import { toast } from "sonner";
import { Helmet } from "react-helmet";
import ProfileModal from "@/components/modules/user/modal/ProfileUpdateModal";

// -------------------- Validation --------------------

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

type PasswordForm = z.infer<typeof passwordSchema>;

export default function MyProfile() {
  const [changePassword] = useChangePasswordMutation();
  const { data: userData } = useGetMeQuery(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

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
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in duration-700">
      <Helmet>
        <title>Profile Settings | NEOPAY</title>
        <meta
          name="description"
          content="Manage your NeoPay profile and security settings"
        />
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-transparent to-transparent p-6 rounded-2xl border border-primary/5">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white">
              <User className="h-4 w-4" />
            </div>
            Profile <span className="text-primary">Settings</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your personal identity, contact info, and security.
          </p>
        </div>
        <div className="bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-none text-sm font-semibold text-muted-foreground md:hidden lg:block">
          Last Activity:{" "}
          <span className="text-primary">
            {userData?.data?.updatedAt
              ? new Date(userData.data.updatedAt).toLocaleDateString()
              : "Today"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Avatar & Status */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-none shadow-black/5 bg-card/60 backdrop-blur-md overflow-hidden sticky top-24">
            <div className="h-2 w-full bg-primary" />
            <CardHeader className="text-center pb-2">
              <div className="relative mx-auto w-32 h-32 mb-4 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping group-hover:pause" />
                <img
                  src={userData?.data?.picture || meImg}
                  className="relative h-32 w-32 rounded-full ring-4 ring-background shadow-2xl object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  alt="Profile"
                />
                {userData?.data?.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-4 border-background shadow-lg">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {userData?.data?.name || "Premium User"}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1.5 font-bold text-primary">
                <Mail className="h-3.5 w-3.5" /> {userData?.data?.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              <Separator className="opacity-50" />

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10">
                  <div className="bg-background p-2 rounded-lg shadow-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-sm font-bold">
                      {userData?.data?.createdAt
                        ? new Date(userData.data.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long" }
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-secondary transition-colors hover:bg-secondary">
                  <div className="bg-background p-2 rounded-lg shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                      Account Status
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {userData?.data?.isActive
                        ? "Verified & Active"
                        : "Pending Verification"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Detailed Forms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Personal Information */}
          <Card className="border-none shadow-none shadow-black/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription>
                  Your identity details as per KYC documents.
                </CardDescription>
              </div>
              <ProfileModal />
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1.5 group">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Full Name
                </Label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-transparent group-hover:border-primary/20 transition-all">
                  <User className="h-4 w-4 text-primary/60" />
                  <p className="text-sm font-bold">
                    {userData?.data?.name || "Not Provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 group">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Phone Number
                </Label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-transparent group-hover:border-primary/20 transition-all">
                  <Phone className="h-4 w-4 text-primary/60" />
                  <p className="text-sm font-bold">
                    {userData?.data?.phone
                      ? `+88${userData.data.phone}`
                      : "Not Provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 group md:col-span-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Current Address
                </Label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-transparent group-hover:border-primary/20 transition-all">
                  <MapPin className="h-4 w-4 text-primary/60" />
                  <p className="text-sm font-bold">
                    {userData?.data?.address || "Street address not provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-none shadow-none shadow-black/5 overflow-hidden">
            <div className="h-1 w-full bg-destructive/50" />
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Lock className="h-5 w-5 text-destructive" /> Security Settings
              </CardTitle>
              <CardDescription>
                We recommend a strong, unique password to protect your funds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20 pl-4 pr-10"
                      {...passwordForm.register("currentPassword")}
                    />
                  </div>
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-destructive text-xs font-bold mt-1 ml-1">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="New strong password"
                      className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20 pl-4"
                      {...passwordForm.register("newPassword")}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-destructive text-xs font-bold mt-1 ml-1">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat new password"
                      className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20 pl-4"
                      {...passwordForm.register("confirmPassword")}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-destructive text-xs font-bold mt-1 ml-1">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/40">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-background shadow-sm transition-colors ${
                        showPassword ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </div>
                    <label
                      htmlFor="show"
                      className="text-sm font-bold cursor-pointer select-none"
                    >
                      Show Passwords
                    </label>
                  </div>
                  <input
                    id="show"
                    type="checkbox"
                    className="h-5 w-5 rounded-md border-primary text-primary focus:ring-primary transition-all cursor-pointer"
                    checked={showPassword}
                    onChange={() => setShowPassword((show) => !show)}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="ghost"
                    type="button"
                    className="h-10 px-6 rounded-md font-bold text-muted-foreground"
                    onClick={() => passwordForm.reset()}
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 px-10 rounded-md font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4 transition-all hover:bg-primary/10">
            <div className="bg-primary text-white p-2.5 rounded-xl shadow-sm">
              <Camera className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-sm uppercase tracking-tight">
                Security Tip
              </h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold">
                  Hello {userData?.data?.name?.split(" ")[0]},
                </span>{" "}
                your security is our priority. Never share your password or OTP
                with anyone. NeoPay will never ask for your credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}
