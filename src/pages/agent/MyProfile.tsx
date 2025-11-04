/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Skeleton } from "@/components/ui/skeleton";

import { CalendarDays, MapPin, ShieldCheck, User } from "lucide-react";
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
  const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined);

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
        <title>NEOPAY - Digital Wallet for NEOPAY</title>
        <meta name="description" content="This is Profile Page" />
      </Helmet>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Agent Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your agent details and avatar
          </p>
        </div>
        <div className="text-sm text-muted-foreground hidden lg:block">
          Last updated:{" "}
          <span className="font-medium">
            {userData?.data?.updatedAt
              ? new Date(userData.data.updatedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 space-y-6 xl:space-y-0 xl:gap-6">
        {/* Left: side bar */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Agent Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {userLoading || !userData?.data ? (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={userData?.data?.picture || meImg}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = meImg;
                  }}
                  className="h-28 w-28 rounded-full ring-1 object-cover object-center"
                />

                <div className="w-full text-center">
                  <div className="font-medium text-xl">
                    {userData?.data?.name ?? "N/A"}
                  </div>

                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {userData?.data?.email ?? "N/A"}
                  </div>
                  <div className="text-sm font-semibold mt-2 text-green-400">
                    {userData?.data?.isVerified ? "Verified Agent" : "N/A"}
                  </div>
                </div>
                <Separator />
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <div className="">
                      <p className="font-medium text-sm">Agent ID</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {userData?.data?._id ?? "00000000"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-5 h-5" />
                    <div className="">
                      <p className="font-medium text-sm">Location</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {userData?.data?.address ?? "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <CalendarDays className="w-5 h-5" />
                    <div className="">
                      <p className="font-medium text-sm">Agent since</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {userData?.data?.createdAt
                          ? new Date(
                              userData.data.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <div className="">
                      <p className="font-medium text-sm">Status</p>
                      <p className="text-green-600 text-sm">
                        {userData?.data?.isVerified && userData?.data?.isActive
                          ? "Active & Verified"
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          {/* personal Information  */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Personal Information
              </CardTitle>
              {/* Edit profile component */}
              <ProfileModal />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 -mt-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full name */}
                  <div>
                    <Label className="text-sm text-foreground">Full Name</Label>
                    <p className="text-base font-medium text-muted-foreground mt-1 border rounded-md px-3 py-2 bg-muted/30">
                      {userData?.data?.name || "Not Provided"}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="text-sm  text-foreground">Phone</Label>
                    <p className="text-base font-medium text-muted-foreground mt-1 border rounded-md px-3 py-2 bg-muted/30">
                      {userData?.data?.phone
                        ? `+88${userData.data.phone}`
                        : "Not Provided"}
                    </p>
                  </div>
                </div>
                {/* Agent Email */}
                <div>
                  <Label className="text-sm  text-foreground">
                    Email Address
                  </Label>
                  <p className="text-base font-medium text-muted-foreground mt-1 border rounded-md px-3 py-2 bg-muted/30">
                    {userData?.data?.email || "Not Provided"}
                  </p>
                </div>

                {/* Address full width */}
                <div>
                  <Label className="text-sm  text-foreground">
                    Branch Location
                  </Label>
                  <p className="text-base font-medium text-muted-foreground mt-1 border rounded-md px-3 py-2 bg-muted/30">
                    {userData?.data?.address || "Not Provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={agentPasswordForm.handleSubmit(onSubmitAgentPassport)}
                className="grid grid-cols-1 gap-4 -mt-1"
              >
                <div>
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="********"
                    {...agentPasswordForm.register("currentPassword")}
                    className="rounded-md mt-1"
                  />
                  {agentPasswordForm.formState.errors.currentPassword && (
                    <p className="text-destructive text-xs mt-1">
                      {
                        agentPasswordForm.formState.errors.currentPassword
                          .message
                      }
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
                      {...agentPasswordForm.register("newPassword")}
                      className="rounded-md mt-1"
                    />
                    {agentPasswordForm.formState.errors.newPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {agentPasswordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat new password"
                      {...agentPasswordForm.register("confirmPassword")}
                      className="rounded-md mt-1"
                    />
                    {agentPasswordForm.formState.errors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">
                        {
                          agentPasswordForm.formState.errors.confirmPassword
                            .message
                        }
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
                    onClick={() => agentPasswordForm.reset()}
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

      {/* <Separator className="my-6" /> */}
    </div>
  );
}
