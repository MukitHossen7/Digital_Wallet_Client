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
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  MapPin,
  ShieldCheck,
  Mail,
  Phone,
  Camera,
  Lock,
  User,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";
import ProfileModal from "@/components/modules/admin/modal/ProfileUpdateModal";
import { motion } from "framer-motion";

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

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MyProfile() {
  const [changePassword] = useChangePasswordMutation();
  const { data: adminData, isLoading: adminLoading } = useGetMeQuery(undefined);
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
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="max-w-7xl container mx-auto py-6 space-y-8"
    >
      <Helmet>
        <title>Admin Profile | NEOPAY</title>
        <meta name="description" content="Manage your professional profile" />
      </Helmet>

      {/* Header Section */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/10 pb-6"
      >
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <User className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
            Admin <span className="text-primary">Profile</span>
          </h1>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            Manage your account settings and security
          </p>
        </div>
        <div className="hidden lg:flex lg:items-center  gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-primary/10">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Last updated:{" "}
            {adminData?.data?.updatedAt
              ? new Date(adminData.data.updatedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Side: Identity Card */}
        <motion.div variants={fadeInUp} className="space-y-6 shadow-none">
          <Card className="overflow-hidden border-none shadow-none bg-card/60 backdrop-blur-xl ring-1 ring-primary/10">
            <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="h-28 w-28 rounded-full ring-4 ring-background overflow-hidden shadow-2xl">
                    <img
                      src={adminData?.data?.picture || meImg}
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="pt-16 pb-8">
              {adminLoading ? (
                <div className="space-y-4 items-center flex flex-col">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {adminData?.data?.name ?? "N/A"}
                    </h2>
                    <p className="text-muted-foreground font-medium flex items-center justify-center gap-1">
                      <Mail className="h-3.5 w-3.5" />{" "}
                      {adminData?.data?.email ?? "N/A"}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified Admin
                    </div>
                  </div>

                  <Separator className="bg-primary/5" />

                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-4 p-3 rounded-xl bg-secondary/30">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">
                          Location
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {adminData?.data?.address ?? "Not Provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl bg-secondary/30">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">
                          Admin Since
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {adminData?.data?.createdAt
                            ? new Date(
                                adminData.data.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                              })
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side: Information & Security */}
        <div className="xl:col-span-2 space-y-6">
          {/* Personal Info Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-none bg-card overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-primary/5 pb-4">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="font-medium text-xs uppercase tracking-widest">
                    General details of your account
                  </CardDescription>
                </div>
                <ProfileModal />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Full Name
                    </Label>
                    <div className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 font-bold text-foreground">
                      {adminData?.data?.name || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> Phone Number
                    </Label>
                    <div className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 font-bold text-foreground">
                      {adminData?.data?.phone
                        ? `+88${adminData.data.phone}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> Branch Address
                    </Label>
                    <div className="px-4 py-3 rounded-xl bg-muted/50 border border-border/50 font-bold text-foreground">
                      {adminData?.data?.address || "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security / Password Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-none bg-card overflow-hidden ring-1 ring-primary/5">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter">
                  <Lock className="h-5 w-5 text-primary" /> Password & Security
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium italic">
                  Keep your account secure with a strong password
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <form
                  onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                  className="space-y-5"
                >
                  <div className="relative group">
                    <Label htmlFor="currentPassword font-black">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter old password"
                      {...passwordForm.register("currentPassword")}
                      className="h-12 rounded-xl mt-2 bg-muted/20 border-border/40 focus:ring-primary focus:border-primary transition-all"
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-destructive text-xs font-bold mt-1.5 flex items-center gap-1">
                        ●{" "}
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword font-black">
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create strong password"
                          {...passwordForm.register("newPassword")}
                          className="h-12 rounded-xl bg-muted/20 border-border/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-destructive text-[10px] font-bold leading-tight">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword font-black">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Repeat new password"
                        {...passwordForm.register("confirmPassword")}
                        className="h-12 rounded-xl bg-muted/20 border-border/40"
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-destructive text-[10px] font-bold">
                          {
                            passwordForm.formState.errors.confirmPassword
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <input
                        id="show"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={showPassword}
                        onChange={() => setShowPassword((show) => !show)}
                      />
                      <label
                        htmlFor="show"
                        className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="md:hidden lg:block">
                          View Clear Password
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => passwordForm.reset()}
                        className="flex-1 sm:flex-none h-10 px-6 rounded-lg font-black uppercase tracking-widest text-xs border-primary/20 hover:bg-primary/5"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 sm:flex-none h-10 px-8 rounded-lg font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Brand Footer */}
      <motion.div variants={fadeInUp} className="text-center pt-8 opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
          © {new Date().getFullYear()} NeoPay Fintech • Secure Admin Terminal
        </p>
      </motion.div>
    </motion.div>
  );
}
