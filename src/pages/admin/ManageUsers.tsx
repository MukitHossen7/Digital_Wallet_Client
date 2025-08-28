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
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
        <CardDescription>
          View all registered users and manage their account status (Block /
          Unblock)
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : userData.data.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData?.data?.map((user: any) => (
                  <TableRow className="" key={user._id}>
                    <TableCell className="flex items-center gap-2">
                      <img
                        src={user?.picture ?? demoImg}
                        alt={user?.name}
                        className="h-10 w-10 rounded-full object-cover ring-1"
                      />
                      <span>{user?.name}</span>
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-white font-medium text-sm ${
                          user?.isActive === "ACTIVE"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user?.isActive}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {user?.isActive === "ACTIVE" ? (
                        <Button
                          variant="destructive"
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
