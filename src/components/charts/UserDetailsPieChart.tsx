"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/hooks/redux-hooks";

const chartConfig = {
  Pending: {
    label: "Pending",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-1))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function UserDetailsPieChart({ totalUsers }: any) {
  const data: any = useAppSelector((state) => state.users.users);
  console.log(data);
  const userData = data?.kycs || [];

  const counts = userData.reduce(
    (
      acc: { pending: number; approved: number; rejected: number },
      user: any
    ) => {
      if (user.status === "pending") acc.pending += 1;
      else if (user.status === "approved") acc.approved += 1;
      else if (user.status === "rejected") acc.rejected += 1;
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 }
  );

  const chartData = [
    { status: "Pending", count: counts.pending, fill: "var(--color-approved)" },
    {
      status: "Approved",
      count: counts.approved,
      fill: "var(--color-rejected)",
    },
    {
      status: "Rejected",
      count: counts.rejected,
      fill: "var(--color-firefox)",
    },
  ];
  console.log("cheċ", data);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Summary</CardTitle>
        <CardDescription>{`Totel Users ${totalUsers}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
