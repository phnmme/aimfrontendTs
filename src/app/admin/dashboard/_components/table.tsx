"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MonthlyData, YearlyData } from "@/types/dashboradType";

export default function MonthlyStatsTable({ data }: { data: YearlyData }) {
  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState<string>();
  const [tableData, setTableData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  useEffect(() => {
    if (selectedYear && data[selectedYear]) {
      setTableData(data[selectedYear]);
    }
  }, [selectedYear, data]);

  const totals = tableData.reduce(
    (acc, m) => {
      acc.totalCustomers += m.totalCustomers;
      acc.totalServices += m.totalServices;
      return acc;
    },
    { totalCustomers: 0, totalServices: 0 }
  );

  return (
    <div className="flex flex-col items-center gap-4 w-[50%] my-4">
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

      <div className="overflow-x-auto w-full  border rounded-lg shadow-md bg-card">
        <table className=" w-full table-auto text-sm">
          <thead>
            <tr className=" text-left">
              <th className="px-4 py-2">เดือน</th>
              <th className="px-4 py-2 text-right">จำนวนลูกค้า</th>
              <th className="px-4 py-2 text-right">จำนวนบริการ</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((m) => (
              <tr
                key={m.month}
                className={`border-t hover:bg-muted/50 ${
                  m.totalCustomers === 0 && m.totalServices === 0
                    ? "text-gray-400"
                    : "text-blue-500"
                }`}
              >
                <td className="px-4 py-2">{m.month}</td>
                <td className="px-4 py-2 text-right">{m.totalCustomers}</td>
                <td className="px-4 py-2 text-right">{m.totalServices}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t font-medium bg-muted/30">
              <td className="px-4 py-2">รวมทั้งหมด</td>
              <td className="px-4 py-2 text-right">{totals.totalCustomers}</td>
              <td className="px-4 py-2 text-right">{totals.totalServices}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-center justify-between w-full mt-3 text-xs text-gray-500">
        <div>
          กำลังแสดงข้อมูลของปี{" "}
          <span className="font-medium">{selectedYear}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const csvRows = [
              "month,totalCustomers,totalServices",
              ...tableData.map(
                (m) => `${m.month},${m.totalCustomers},${m.totalServices}`
              ),
            ];
            const csv = csvRows.join("\n");
            navigator.clipboard.writeText(csv);
          }}
        >
          คัดลอก CSV
        </Button>
      </div>
    </div>
  );
}
