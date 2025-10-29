"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { BadgeCardDate, BadgeCardType } from "./badge-card";
import { summaryType } from "@/types/dashboradType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function CardExpirations({ summary }: { summary: summaryType }) {
  return (
    <Card className="w-full border border-sky-700/40 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Bell className="size-5 text-sky-500" />
            ใกล้หมดอายุ
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          บริการที่ใกล้หมดอายุในเร็วๆ นี้
        </CardDescription>
      </CardHeader>

      <Separator className="mb-3" />

      <CardContent className="p-0">
        <ScrollArea className="h-96 w-full">
          <div className="flex flex-col divide-y divide-border/40">
            {summary.expvehicleInfo.length > 0 ? (
              summary.expvehicleInfo.map((activity, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    {/* แถวบน: ทะเบียน + ประเภท + วันที่หมดอายุ */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate max-w-[220px]">
                          ทะเบียน: {activity.vehicleNumber}
                        </h3>
                        <BadgeCardType serviceType={activity.serviceType} />
                      </div>
                      <BadgeCardDate endDate={activity.endDate} />
                    </div>

                    <p className="text-sm text-muted-foreground truncate max-w-[220px]">
                      {activity.customerName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.endDate).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                ไม่มีข้อมูลบริการใกล้หมดอายุ
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
