/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// your magic number ticker
import { MapPin, ShieldMinus, UserCheck, Users, UserX } from "lucide-react";
import { useGetAllUsersStatisticsQuery } from "@/redux/features/stats/stats.api";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useHandleBlockMutation,
  useUnBlockUserMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MdBlockFlipped } from "react-icons/md";

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
  const normalized = status?.toUpperCase() || "UNKNOWN";
  if (normalized === "ACTIVE")
    return (
      <Badge className="bg-emerald-50 text-emerald-700 rounded-full text-xs">
        ACTIVE
      </Badge>
    );
  if (normalized === "BLOCKED" || normalized === "SUSPENDED")
    return (
      <Badge className="bg-rose-50 text-rose-700 rounded-full text-xs">
        {normalized}
      </Badge>
    );
  return <Badge>{normalized}</Badge>;
};

// Main component
export default function ManageUser() {
  const [handleBlock] = useHandleBlockMutation();
  const [unBlockUser] = useUnBlockUserMutation();
  const { data, isLoading } = useGetAllUsersStatisticsQuery(null);

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
    <div className="container mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all user accounts
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <NumberTicker
                className="text-blue-700 dark:text-blue-700"
                value={data?.data?.totalUsers ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All registered users
            </p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <NumberTicker
                className="text-green-500 dark:text-green-500"
                value={data?.data?.activeUsers ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active users
            </p>
          </CardContent>
        </Card>

        {/* Blocked Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <UserX className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold ">
              <NumberTicker
                className="text-red-600 dark:text-red-600"
                value={data?.data?.blockUsers ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Users who are blocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users table card */}
      <Card>
        <CardHeader className="-mb-2">
          <div className="">
            <CardTitle className="text-lg font-semibold">
              Users (<NumberTicker value={data?.data?.totalUsers ?? 0} />)
            </CardTitle>
            <CardDescription>List of registered users</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : data?.data?.userData?.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.userData?.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                ?.map((n: any) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>

                            <p className="text-xs text-muted-foreground">
                              {user._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {user.phone ?? "N/A"}{" "}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium ">{user?.email}</span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {user?.address || "Bangladesh"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={"capitalize"}>
                          {user.role?.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={user.isActive} />
                      </TableCell>
                      <TableCell>
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

      {/* Responsive hints */}
      <div className="mt-4 text-xs text-muted-foreground">
        * Table columns hide on smaller screens for better responsiveness.
      </div>
    </div>
  );
}
