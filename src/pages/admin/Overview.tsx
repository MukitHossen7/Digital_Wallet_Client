import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCheck,
  CreditCard,
  BarChart2,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUserAndAgentQuery } from "@/redux/features/user/user.api";
import {
  useGetALLTransactionQuery,
  useGetAllTransactionVolumeQuery,
} from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";
import { NumberTicker } from "@/components/ui/number-ticker";

const chartConfig: ChartConfig = {
  value: {
    label: "Overview",
    color: "var(--chart-1)",
  },
};

export default function Overview() {
  const { data: userData, isLoading: userLoading } = useGetAllUserAndAgentQuery(
    { user: "user" }
  );
  const { data: agentData, isLoading: agentLoading } =
    useGetAllUserAndAgentQuery({ user: "agent" });

  const { data: transactionData, isLoading: transactionLoading } =
    useGetALLTransactionQuery({
      page: 1,
      limit: 0,
    });

  const { data: transactionVolume, isLoading: volumeLoading } =
    useGetAllTransactionVolumeQuery(undefined);

  const chartData = [
    { name: "Total Users", value: userData?.data?.length ?? 0 },
    { name: "Total Agents", value: agentData?.data?.length ?? 0 },
    { name: "Transactions", value: transactionData?.meta?.total ?? 0 },
  ];

  return (
    <div className="max-w-6xl container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6">
      <Helmet>
        <title>Admin Dashboard - NEOPAY</title>
        <meta name="description" content="This is Overview Page" />
      </Helmet>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="p-4 flex flex-col justify-between">
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-400 text-white">
                <Users />
              </div>
              <CardTitle>Total Users</CardTitle>
            </div>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent className="-mt-4">
            {userLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl lg:text-3xl font-bold">
                <NumberTicker value={userData?.data?.length || 0} />
              </p>
            )}
          </CardContent>
        </Card>

        {/* Total Agents */}
        <Card className="p-4 flex flex-col justify-between">
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-yellow-400 text-white">
                <UserCheck />
              </div>
              <CardTitle>Total Agents</CardTitle>
            </div>
            <CardDescription>Verified service providers</CardDescription>
          </CardHeader>
          <CardContent className="-mt-4">
            {agentLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl lg:text-3xl font-bold">
                <NumberTicker value={agentData?.data?.length || 0} />
              </p>
            )}
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="p-4 flex flex-col justify-between">
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-pink-400 text-white">
                <CreditCard />
              </div>
              <CardTitle>Transactions</CardTitle>
            </div>
            <CardDescription>Total successful transactions</CardDescription>
          </CardHeader>
          <CardContent className="-mt-4">
            {transactionLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl lg:text-3xl font-bold">
                <NumberTicker value={transactionData?.meta?.total || 0} />
              </p>
            )}
          </CardContent>
        </Card>

        {/* Transaction Volume */}
        <Card className="p-4 flex flex-col justify-between">
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-400 text-white">
                <BarChart2 />
              </div>
              <CardTitle>Transaction Volume</CardTitle>
            </div>
            <CardDescription>Overall money flow</CardDescription>
          </CardHeader>
          <CardContent className="-mt-4">
            {volumeLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl lg:text-3xl font-bold">
                <NumberTicker value={transactionVolume?.data || 0} /> BDT
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* overview graph */}
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Overview Chart</CardTitle>
          <CardDescription>
            Snapshot of Users, Agents, and Transactions
          </CardDescription>
        </CardHeader>

        <CardContent>
          {userLoading || agentLoading || transactionLoading ? (
            <Skeleton className="h-[250px] w-full rounded-lg" />
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12, top: 12, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient
                    id="overviewGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  type="natural"
                  fill="url(#overviewGradient)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>

        {!userLoading && !agentLoading && !transactionLoading && (
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Overview data updated in real-time{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  Users · Agents · Transactions
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
