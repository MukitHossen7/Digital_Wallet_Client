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

import { Skeleton } from "@/components/ui/skeleton";
import { MdCheckCircleOutline } from "react-icons/md";
import {
  useApproveAgentMutation,
  useGetAllUserAndAgentQuery,
  useSuspendAgentMutation,
} from "@/redux/features/user/user.api";
import demoImg from "../../assets/images/panda.jpg";
import { toast } from "sonner";
import { FaBan } from "react-icons/fa";

export default function ManageAgents() {
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const { data: agentData, isLoading } = useGetAllUserAndAgentQuery({
    user: "agent",
  });

  const handleApproveAgent = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing agent approve...");
      const res = await approveAgent({ id: id }).unwrap();
      if (res.success) {
        toast.success("Agent approve Successfully", { id: toastId });
      } else {
        toast.error("Agent approve Failed", { id: toastId });
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

  const handleSuspendAgent = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing agent suspend...");
      const res = await suspendAgent({ id: id }).unwrap();
      if (res.success) {
        toast.success("Agent Suspend Successfully", { id: toastId });
      } else {
        toast.error("Agent Suspend Failed", { id: toastId });
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
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">Manage Agents</CardTitle>
        <CardDescription>
          View all agents and manage their account status (approve/suspend)
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : agentData?.data?.length > 0 ? (
          <>
            <Table className="min-w-full border-collapse">
              <TableHeader className="hidden lg:table-header-group">
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {agentData?.data?.map((user: any) => (
                  <TableRow
                    key={user._id}
                    className="flex flex-col lg:table-row border rounded-lg lg:border-0 mb-4 lg:mb-0 p-4 lg:p-0 shadow-sm lg:shadow-none "
                  >
                    {/* Profile */}
                    <TableCell className="flex items-center gap-3 lg:table-cell">
                      <div className="flex items-center gap-2">
                        <img
                          src={user?.picture ?? demoImg}
                          alt={user?.name}
                          className="h-8 w-8 rounded-full object-cover ring-1"
                        />
                        <span className="font-medium">{user?.name}</span>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="flex justify-between lg:table-cell text-sm text-gray-700 dark:text-gray-200 mt-2 lg:mt-0">
                      <span className="font-semibold lg:hidden">Email: </span>
                      {user?.email}
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="flex justify-between lg:table-cell text-sm text-gray-700 dark:text-gray-200 mt-2 lg:mt-0">
                      <span className="font-semibold lg:hidden">Phone: </span>
                      {user?.phone ?? "N/A"}
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
                          onClick={() => handleSuspendAgent(user?._id)}
                          title="Suspend Agent"
                          className="cursor-pointer"
                        >
                          <FaBan className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproveAgent(user?._id)}
                          title="Approve Agent"
                          className="cursor-pointer"
                        >
                          <MdCheckCircleOutline className="h-4 w-4" />
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
                <CardTitle className="text-base">No agent found</CardTitle>
                <CardDescription>
                  No agent match your criteria. Try adjusting filters.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
