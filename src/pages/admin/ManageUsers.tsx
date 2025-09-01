/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldMinus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdBlockFlipped } from "react-icons/md";
import {
  useGetAllUserAndAgentQuery,
  useHandleBlockMutation,
  useUnBlockUserMutation,
} from "@/redux/features/user/user.api";
import demoImg from "../../assets/images/panda.jpg";
import { toast } from "sonner";
import { Helmet } from "react-helmet";

export default function ManageUsers() {
  const [handleBlock] = useHandleBlockMutation();
  const [unBlockUser] = useUnBlockUserMutation();
  const { data: userData, isLoading } = useGetAllUserAndAgentQuery({
    user: "user",
  });
  const handleBlockUser = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing user block...");
      const res = await handleBlock({ id: id }).unwrap();
      if (res.success) {
        toast.success("User blocked Successfully", { id: toastId });
      } else {
        toast.error("User blocked Failed", { id: toastId });
      }
    } catch (error: any) {
      if (toastId) {
        toast.error(error?.data?.message, { id: toastId });
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  const handleUnblockUser = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing user unblock...");
      const res = await unBlockUser({ id: id }).unwrap();
      if (res.success) {
        toast.success("User unblocked Successfully", { id: toastId });
      } else {
        toast.error("User unblocked Failed", { id: toastId });
      }
    } catch (error: any) {
      if (toastId) {
        toast.error(error?.data?.message, { id: toastId });
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  return (
    <Card className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>Dashboard - All Users</title>
        <meta name="description" content="This is All Users Page" />
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">Manage Users</CardTitle>
        <CardDescription>
          View all registered users and manage their account status (Block /
          Unblock)
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : userData?.data?.length > 0 ? (
          <>
            <Table className="min-w-full border-collapse">
              <TableHeader className="hidden lg:table-header-group">
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData?.data?.map((user: any) => (
                  <TableRow
                    key={user._id}
                    className="flex flex-col lg:table-row rounded-lg border lg:border-0 mb-4 lg:mb-0 p-4 lg:p-0 shadow-sm lg:shadow-none"
                  >
                    {/* Profile */}
                    <TableCell className="flex items-center gap-3 lg:table-cell">
                      <div className="flex items-center gap-2">
                        <img
                          src={user?.picture ?? demoImg}
                          alt={user?.name}
                          className="h-10 w-10 rounded-full object-cover ring-1"
                        />
                        <span className="font-medium">{user?.name}</span>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="flex justify-between lg:table-cell text-sm text-gray-700 dark:text-gray-200 mt-2 lg:mt-0">
                      <span className="font-semibold lg:hidden">Email: </span>
                      {user?.email}
                    </TableCell>

                    {/* Role */}
                    <TableCell className="flex justify-between lg:table-cell font-semibold text-sm text-gray-700 dark:text-gray-200 mt-2 lg:mt-0">
                      <span className="font-semibold lg:hidden">Role: </span>
                      {user?.role}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="flex justify-between lg:table-cell mt-2 lg:mt-0">
                      <span className="font-semibold lg:hidden">Status: </span>
                      <span
                        className={`px-2 py-1 rounded-full text-white font-medium text-xs ${
                          user?.isActive === "ACTIVE"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user?.isActive}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="flex justify-between lg:table-cell lg:justify-end gap-2 mt-2 lg:mt-0 text-right">
                      <span className="font-semibold lg:hidden">Action: </span>
                      {user?.isActive === "ACTIVE" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlockUser(user?._id)}
                          title="Block User"
                          className="cursor-pointer"
                        >
                          <MdBlockFlipped className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnblockUser(user?._id)}
                          title="Unblock User"
                          className="cursor-pointer"
                        >
                          <ShieldMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div>
            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle className="text-base">No user found</CardTitle>
                <CardDescription>
                  No users match your criteria. Try adjusting filters.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
