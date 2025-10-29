"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { logType } from "@/types/dashboradType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function CardActivities({ log }: { log: logType[] }) {
  function translateActionType(actionType: string) {
    const map = {
      userLogin: "เข้าสู่ระบบ",
      userLogout: "ออกจากระบบ",
      userRegister: "ลงทะเบียนผู้ใช้ใหม่",
      customerAdd: "เพิ่มข้อมูลลูกค้า",
      customerEdit: "แก้ไขข้อมูลลูกค้า",
      customerDelete: "ลบข้อมูลลูกค้า",
      vehicleAdd: "เพิ่มข้อมูลรถ",
      vehicleEdit: "แก้ไขข้อมูลรถ",
      vehicleDelete: "ลบข้อมูลรถ",
      serviceAdd: "เพิ่มข้อมูลบริการ",
      serviceEdit: "แก้ไขข้อมูลบริการ",
      serviceDelete: "ลบข้อมูลบริการ",
      fileDownload: "ดาวน์โหลดไฟล์",
      notificationSend: "ส่งการแจ้งเตือน",
    } as const;

    return map[actionType as keyof typeof map] || actionType;
  }

  return (
    <Card className="w-full h-fit border border-sky-700/40 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Bell className="size-5 text-sky-500" />
            กิจกรรมล่าสุด
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          กิจกรรมที่เกิดขึ้นในระบบล่าสุด
        </CardDescription>
      </CardHeader>

      <Separator className="mb-3" />

      <CardContent className="p-0">
        <ScrollArea className="h-96 w-full">
          <div className="flex flex-col divide-y divide-border/40">
            {log.length > 0 ? (
              log.map((logs, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex flex-col">
                    <h3 className="font-medium truncate max-w-[250px]">
                      {translateActionType(logs.actionType)}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                      {logs?.user?.name || "-"}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(logs.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                ไม่มีข้อมูลกิจกรรมล่าสุด
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
