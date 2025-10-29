"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface GraphItem {
  month: string;
  totalCustomers: number;
  totalServices: number;
}

interface RawData {
  [year: string]: GraphItem[];
}

interface RechartsProps {
  data: RawData;
}

export default function Recharts({ data }: RechartsProps) {
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState(years[0] || "");
  const [chartData, setChartData] = useState<GraphItem[]>([]);

  useEffect(() => {
    if (selectedYear) {
      setChartData(data[selectedYear] ?? []);
    }
  }, [selectedYear, data]);

  return (
    <div className="flex flex-col items-center gap-4 w-full min-h-[500px] my-2 ">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold mb-2">สถิติรายเดือน</h2>
        <div className="flex items-center gap-2">
          <Label>เลือกปี:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-black" variant="outline">
                {selectedYear || "เลือกปี"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {years.map((year) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={year}
                  onClick={() => setSelectedYear(year)}
                >
                  ปี {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="w-full max-w-full h-[400px] border bg-card  rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#4B5563", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#4B5563", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickLine={false}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <Line
                type="monotone"
                dataKey="totalCustomers"
                stroke="#10B981"
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: "#10B981",
                  strokeWidth: 2,
                  fill: "#6EE7B7",
                }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="totalServices"
                stroke="#F28C28"
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: "#F28C28",
                  strokeWidth: 2,
                  fill: "#DAA06D",
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No data available for selected year</p>
      )}
    </div>
  );
}
