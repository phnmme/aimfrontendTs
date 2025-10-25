"use client";

import { useEffect, useState } from "react";
import { dashboardGetSummaryAction } from "@/actions/dashborad-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summaryType } from "@/types/dashboradType";
import { CarFront, TriangleAlert, Users } from "lucide-react";

export default function CardSummarized() {
  const [summary, setSummary] = useState<summaryType | null>(null);

  const fetchSummary = async () => {
    const res = await dashboardGetSummaryAction();
    if (res.success) {
      setSummary(res.data);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const cardData = [
    {
      title: "ลูกค้าทั้งหมด",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      iconBg: "bg-blue-100",
      value: summary?.customerCount ?? "-",
      subtext: "รายชื่อในระบบ",
    },
    {
      title: "รถยนต์ทั้งหมด",
      icon: <CarFront className="h-5 w-5 text-green-500" />,
      iconBg: "bg-green-100",
      value: summary?.vehicleCount ?? "-",
      subtext: "คันในระบบ",
    },
    {
      title: "ใกล้หมดอายุ",
      icon: <TriangleAlert className="h-5 w-5 text-yellow-500" />,
      iconBg: "bg-yellow-100",
      value: summary?.expvehicleCount ?? "-",
      subtext: "คันในเดือนนี้",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
      {cardData.map((item, index) => (
        <Card
          key={index}
          className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">
                {item.title}
              </CardTitle>
            </div>
            <div
              className={`p-3 rounded-full ${item.iconBg} flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold ">{item.value}</div>
            <p className="text-sm text-gray-400 mt-1">{item.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
