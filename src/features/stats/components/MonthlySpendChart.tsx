"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { MonthlyData } from "../hooks/useMonthlyStats";

interface MonthlySpendChartProps {
  data: MonthlyData[];
}

const formatWon = (value: number) => {
  if (value >= 10000) return `${(value / 10000).toFixed(0)}만`;
  return `${value.toLocaleString()}`;
};

export const MonthlySpendChart = ({ data }: MonthlySpendChartProps) => {
  const maxSpend = Math.max(...data.map((d) => d.totalSpend), 1);
  const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatWon}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value) => [`₩${Number(value).toLocaleString()}`, "지출"]}
            labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
            contentStyle={{
              backgroundColor: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              fontSize: 13,
            }}
            cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
          />
          <Bar dataKey="totalSpend" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((entry) => (
              <Cell
                key={entry.month}
                fill={
                  entry.month === currentMonth
                    ? "var(--color-primary)"
                    : entry.totalSpend === maxSpend && entry.totalSpend > 0
                    ? "var(--color-green-600)"
                    : "var(--color-green-300)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
