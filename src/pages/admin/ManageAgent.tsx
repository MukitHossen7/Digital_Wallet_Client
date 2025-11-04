/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllAgentStatisticsQuery } from "@/redux/features/stats/stats.api";
import {
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/user/user.api";
import { MapPin, UserCheck, Users, UserX } from "lucide-react";
import { Helmet } from "react-helmet";
import { FaBan } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";
import { toast } from "sonner";

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

const ManageAgent = () => {
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const { data: agentData, isLoading } = useGetAllAgentStatisticsQuery(null);

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
    <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>Admin Dashboard - NEOPAY</title>
        <meta name="description" content="This is All Agent Page" />
      </Helmet>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Agent Management</h1>
        <p className="text-base text-muted-foreground">
          Approve, manage, and monitor agent performance
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agent</CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <NumberTicker
                className="text-blue-700 dark:text-blue-700"
                value={agentData?.data?.totalAgents ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All registered agents
            </p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Agent</CardTitle>
            <UserCheck className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <NumberTicker
                className="text-green-500 dark:text-green-500"
                value={agentData?.data?.activeAgents ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active agents
            </p>
          </CardContent>
        </Card>

        {/* Blocked Users */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Suspended Agent
            </CardTitle>
            <UserX className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold ">
              <NumberTicker
                className="text-red-600 dark:text-red-600"
                value={agentData?.data?.blockAgents ?? 0}
              />
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Agents who are suspended
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users table card */}
      <Card>
        <CardHeader className="-mb-2">
          <div className="">
            <CardTitle className="text-lg font-semibold">
              Agents (<NumberTicker value={agentData?.data?.totalAgents ?? 0} />
              )
            </CardTitle>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : agentData?.data?.data?.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentData?.data?.data?.map((user: any) => (
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
                    No agents match your criteria. Try adjusting filters.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAgent;
