import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { Camera, User, Phone, Lock, Eye, EyeOff } from "lucide-react";

// -------------------- Validation --------------------
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(
      /^(?:\+?88)?01[3-9][0-9]{8}$/,
      "Enter a valid Bangladeshi phone (e.g. 017XXXXXXXX)"
    ),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Include at least one digit")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

// -------------------- Mock user (replace with RTK Query) --------------------
const MOCK_USER = {
  id: "user_001",
  name: "Mukit Hossen",
  email: "mukit@example.com",
  phone: "+8801712345678",
  avatarUrl: "",
};

export default function ProfilePageWithSonner() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "" },
    mode: "onChange",
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
    // Simulate fetch user (replace with RTK Query or context)
    const t = setTimeout(() => {
      setUser(MOCK_USER);
      profileForm.reset({ name: MOCK_USER.name, phone: MOCK_USER.phone });
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Avatar change (preview only). Replace upload logic with your cloud API.
  function handleAvatarChange(file?: File) {
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  }

  async function onSubmitProfile(values: ProfileForm) {
    // Use toast.promise for better UX (sonner)
    try {
      await toast.promise(
        () =>
          new Promise((resolve) => {
            // Replace with your updateProfile API call (RTK Query mutation)
            setTimeout(() => {
              // simulate server response
              setUser((u) =>
                u ? { ...u, name: values.name, phone: values.phone } : u
              );
              resolve(true);
            }, 900);
          }),
        {
          loading: "Updating profile...",
          success: "Profile updated successfully!",
          error: "Could not update profile",
        }
      );

      // If avatarFile exists, you should upload it to your storage (S3/Cloudinary)
      if (avatarFile) {
        // example: await uploadAvatar(avatarFile)
        // For demo, show a success toast after a short delay
        await new Promise((r) => setTimeout(r, 600));
        toast.success("Avatar uploaded");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    }
  }

  async function onSubmitPassword(values: PasswordForm) {
    try {
      await toast.promise(
        () =>
          new Promise((resolve, reject) => {
            // Replace with changePassword API call (RTK Query mutation)
            setTimeout(() => {
              // fake check: if currentPassword === 'wrong' => fail
              if (values.currentPassword === "wrong")
                return reject(new Error("Bad password"));
              resolve(true);
            }, 900);
          }),
        {
          loading: "Changing password...",
          success: "Password changed successfully",
          error: "Could not change password",
        }
      );

      passwordForm.reset();
    } catch (err) {
      toast.error("Password update failed");
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8">
      {/* Sonner Toaster: you can also add this at app root instead of here */}
      <Toaster />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" /> Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your name, phone, password and profile image.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: <span className="font-medium">Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar & summary */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Personal details & avatar</CardDescription>
          </CardHeader>

          <CardContent>
            {loading || !user ? (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-28 w-28">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="avatar" />
                  ) : user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt="avatar" />
                  ) : (
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="w-full space-y-2 text-center">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{user.name}</div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Email
                  </div>
                  <div className="font-medium">{user.email}</div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Phone
                  </div>
                  <div className="font-medium">{user.phone}</div>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleAvatarChange(f);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-xl"
                  >
                    <Camera className="h-4 w-4" /> Change avatar
                  </Button>
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Forms */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update profile</CardTitle>
              <CardDescription>Change name and phone number</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={profileForm.handleSubmit(onSubmitProfile)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    {...profileForm.register("name")}
                    className="rounded-xl mt-1"
                  />
                  {profileForm.formState.errors.name && (
                    <p className="text-destructive text-xs mt-1">
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
                      className="pl-12 rounded-xl"
                      {...profileForm.register("phone")}
                    />
                  </div>
                  {profileForm.formState.errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {profileForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-xl"
                    onClick={() =>
                      profileForm.reset(
                        user ? { name: user.name, phone: user.phone } : {}
                      )
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl"
                    disabled={
                      !profileForm.formState.isValid ||
                      profileForm.formState.isSubmitting
                    }
                  >
                    Save changes
                  </Button>
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
                    placeholder="••••••••"
                    {...passwordForm.register("currentPassword")}
                    className="rounded-xl mt-1"
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
                      className="rounded-xl mt-1"
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
                      className="rounded-xl mt-1"
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
                    onChange={() => setShowPassword((s) => !s)}
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
                    className="rounded-xl"
                    onClick={() => passwordForm.reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl"
                    disabled={
                      !passwordForm.formState.isValid ||
                      passwordForm.formState.isSubmitting
                    }
                  >
                    Change password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground flex items-start gap-2">
            <Camera className="mt-1" />
            <div>
              Tip: Use a clear photo for your profile. Avatar uploads should be
              sent to a secure storage (S3/Cloudinary). I can add an example
              integration if you want.
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="text-sm text-muted-foreground">
        Need help? Contact support at{" "}
        <a className="underline" href="mailto:support@wallet.example">
          support@wallet.example
        </a>
      </div>
    </div>
  );
}
