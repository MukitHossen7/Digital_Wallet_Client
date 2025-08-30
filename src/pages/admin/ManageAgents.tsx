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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentData?.data?.map((user: any) => (
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
                    <TableCell>{user?.phone ?? "N/A"}</TableCell>
                    <TableCell className="font-semibold">
                      {user?.isActive}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-white font-medium text-xs ${
                          user?.role === "AGENT" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {user?.role === "AGENT" ? (
                        <Button
                          variant="destructive"
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
