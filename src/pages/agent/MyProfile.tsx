/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

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
import meImg from "../../assets/images/panda.jpg";

import {
  CalendarDays,
  MapPin,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BadgeCheck,
  Fingerprint,
} from "lucide-react";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "@/redux/features/auth/auth.api";

import { toast } from "sonner";
import { Helmet } from "react-helmet";
import ProfileModal from "@/components/modules/agent/modal/ProfileUpdateModal";

const agentPasswordSchema = z
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

type AgentPasswordForm = z.infer<typeof agentPasswordSchema>;

export default function AgentProfile() {
  const [changePassword] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { data: userData } = useGetMeQuery(undefined);

  const agentPasswordForm = useForm<AgentPasswordForm>({
    resolver: zodResolver(agentPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmitAgentPassport(values: AgentPasswordForm) {
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
        agentPasswordForm.reset();
      } else {
        toast.error("Change password Failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl container mx-auto py-6 space-y-8"
    >
      <Helmet>
        <title>Agent Profile | NEOPAY</title>
      </Helmet>

      {/* Modern Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-lg shadow-none shadow-primary/5">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            Agent <span className="text-primary">Profile</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your personal profile and security credentials.
          </p>
        </div>
        <div className="bg-background/80 px-4 py-1 rounded-full border border-primary/20 shadow-none md:hidden lg:block">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Last Update:{" "}
          </span>
          <span className="text-xs font-black text-primary uppercase">
            {userData?.data?.updatedAt
              ? new Date(userData.data.updatedAt).toLocaleDateString()
              : "Today"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Card: Agent Overview */}
        <Card className="xl:col-span-4 border-none shadow-none shadow-black/[0.03] rounded-lg overflow-hidden xl:sticky xl:top-24">
          <div className="h-3 w-full bg-primary" />
          <CardHeader className="text-center pb-2">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <img
                src={userData?.data?.picture || meImg}
                className="relative h-32 w-32 rounded-full ring-4 ring-background shadow-2xl object-cover object-center"
                alt="Agent"
              />
              {userData?.data?.isVerified && (
                <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-4 border-background shadow-lg">
                  <BadgeCheck className="h-5 w-5" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {userData?.data?.name || "Premium Agent"}
            </CardTitle>
            <CardDescription className="font-bold text-primary tracking-widest uppercase text-[10px] bg-primary/10 px-3 py-1 rounded-full w-fit mx-auto mt-2">
              Official Partner
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <Separator className="bg-border/60" />
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="bg-muted p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <Fingerprint className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">
                    Agent ID
                  </p>
                  <p className="font-bold text-sm tracking-tight">
                    {userData?.data?._id?.slice(-10) || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="bg-muted p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">
                    Branch
                  </p>
                  <p className="font-bold text-sm tracking-tight">
                    {userData?.data?.address || "Main Branch"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="bg-muted p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">
                    Account Status
                  </p>
                  <p className="font-bold text-sm text-emerald-600 tracking-tight">
                    Verified & Active
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-border/60" />

            <div className="bg-muted/30 p-4 rounded-2xl border border-dashed border-border/60">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-[10px] font-black text-muted-foreground uppercase">
                  Member Since
                </span>
              </div>
              <p className="text-sm font-bold text-foreground">
                {userData?.data?.createdAt
                  ? new Date(userData.data.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Section: Details & Security */}
        <div className="xl:col-span-8 space-y-8">
          {/* Personal Information */}
          <Card className="border-none shadow-none shadow-black/[0.03] rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/20 px-8 py-6">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription>KYC verified personal details</CardDescription>
              </div>
              <ProfileModal />
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Full Name
                  </Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-muted/40 border border-border/50 font-bold text-foreground">
                    {userData?.data?.name || "Not Provided"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Phone Number
                  </Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-muted/40 border border-border/50 font-bold text-foreground">
                    <span className="text-muted-foreground mr-1">+88</span>{" "}
                    {userData?.data?.phone || "N/A"}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Official Email Address
                  </Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-muted/40 border border-border/50 font-bold text-foreground">
                    <Mail className="w-4 h-4 mr-3 text-muted-foreground" />{" "}
                    {userData?.data?.email || "N/A"}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Operating Location
                  </Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-muted/40 border border-border/50 font-bold text-foreground">
                    <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />{" "}
                    {userData?.data?.address || "Not Provided"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-none shadow-none shadow-black/[0.03] rounded-lg overflow-hidden overflow-hidden">
            <div className="h-1.5 w-full bg-destructive/50" />
            <CardHeader className="px-8 py-6">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Lock className="h-5 w-5 text-destructive" /> Security Settings
              </CardTitle>
              <CardDescription>
                Update your terminal access password
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form
                onSubmit={agentPasswordForm.handleSubmit(onSubmitAgentPassport)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">
                    Current Security PIN/Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20"
                      {...agentPasswordForm.register("currentPassword")}
                    />
                  </div>
                  {agentPasswordForm.formState.errors.currentPassword && (
                    <p className="text-destructive text-xs font-bold mt-1 ml-1">
                      {
                        agentPasswordForm.formState.errors.currentPassword
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Strong Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20"
                        {...agentPasswordForm.register("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {agentPasswordForm.formState.errors.newPassword && (
                      <p className="text-destructive text-xs font-bold mt-1 ml-1">
                        {agentPasswordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat Password"
                      className="h-12 rounded-xl bg-muted/20 border-border/60 focus:ring-primary/20"
                      {...agentPasswordForm.register("confirmPassword")}
                    />
                    {agentPasswordForm.formState.errors.confirmPassword && (
                      <p className="text-destructive text-xs font-bold mt-1 ml-1">
                        {
                          agentPasswordForm.formState.errors.confirmPassword
                            .message
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button
                    variant="ghost"
                    type="button"
                    className="h-10 px-6 rounded-lg font-bold text-muted-foreground"
                    onClick={() => agentPasswordForm.reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 px-8 rounded-lg font-bold shadow-none shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Update Security PIN
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
