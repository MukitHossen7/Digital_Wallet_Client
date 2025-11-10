/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import Password from "@/components/ui/Password";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password is too long"),
});

type FormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  // console.log(id);
  // console.log(token);

  useEffect(() => {
    if (!id && !token) {
      navigate("/");
    }
  }, [id, token, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const handleResetFrom = async (value: FormData) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Resetting your password...");
      const res = await resetPassword({
        newPassword: value.newPassword,
        id: id as string,
        token: token as string,
      }).unwrap();
      if (res.success) {
        toast.success("Your password has been reset successfully!", {
          id: toastId,
        });
        navigate("/login");
        reset();
      } else {
        toast.error("Failed to reset password. Please try again.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      const message =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(message, { id: toastId });
    }
  };
  return (
    <div className="py-12 md:py-20 px-4 md:px-0">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below to secure your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleResetFrom)}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                New Password
              </label>

              <Password
                id="newPassword"
                placeholder="Enter new password"
                {...register("newPassword")}
                className="mt-1 w-full"
              />

              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </DialogFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
