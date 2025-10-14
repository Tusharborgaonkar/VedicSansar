"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import useFetch from "@/hooks/useFetch"

export const description = "A bar chart"

// const chartData = [
//   { month: "January", amount: 2986 },
//   { month: "February", amount: 2305 },
//   { month: "March", amount: 2237 },
//   { month: "April", amount: 2733 },
//   { month: "May", amount: 2209 },
//   { month: "June", amount: 1214 },
//   { month: "July", amount: 3789 },
//   { month: "August", amount: 3989 },
//   { month: "September", amount: 1019 },
//   { month: "October", amount: 2029 },
//   { month: "November", amount: 3333 },
//   { month: "December", amount: 5566 },

// ]

const months = [
  "January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December",
]


const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-1)",
  },
} 

export function OrderOverview() {
  const [chartData , setChartData] = useState([]);
  const {data : monthlySales, loading} = useFetch('/api/dashboard/admin/monthly-sales');
  useEffect(() => {
  if (monthlySales && monthlySales.success) {
    const getChartData = months.map((month, index) => {
      const monthData = monthlySales.data.find(item => item._id.month === index + 1);
      return {
        month: month,
        amount: monthData ? monthData.totalSales : 0
      };
    });

    setChartData(getChartData);
  }
}, [monthlySales]);

  return (
    <div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="amount" fill="var(--chart-1)" radius={5} />
          </BarChart>
        </ChartContainer>
    </div>
  )
}
