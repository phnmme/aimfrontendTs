"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MyData, Service } from "@/types/configsite";
import {
  sendLineNotification,
  updateSettingAction,
} from "@/actions/config-action";
import { Send } from "lucide-react";

export default function LineNotificationPanel({ data }: { data: MyData }) {
  const [lineToken, setLineToken] = useState(data.settings[0]?.value || "");
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );

  const handleSaveToken = async () => {
    try {
      await updateSettingAction(lineToken);
      toast.success("✅ อัปเดต Token สำเร็จ");
    } catch (err) {
      console.error(err);
      toast.error("❌ ไม่สามารถอัปเดต Token ได้");
    }
  };

  const handleSendSingle = async (service: Service) => {
    try {
      setLoading((prev) => ({ ...prev, [service.id]: true }));

      const res = await sendLineNotification(
        service.vehicle.customerId,
        service.vehicle.vehicleNumber,
        service.serviceType,
        service.endDate,
        service.id
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(
        `📨 ส่งแจ้งเตือนสำหรับ ${service.vehicle.vehicleNumber} สำเร็จ`
      );
    } catch (err) {
      console.error(err);
      toast.error("❌ ผิดพลาด");
    } finally {
      setLoading((prev) => ({ ...prev, [service.id]: false }));
    }
  };

  const handleSendSelected = async () => {
    if (selectedServices.size === 0) {
      toast.error("⚠️ กรุณาเลือกรายการที่ต้องการส่ง");
      return;
    }

    try {
      const selectedList = data.service.filter((s) =>
        selectedServices.has(s.id)
      );

      for (const service of selectedList) {
        await handleSendSingle(service);
      }

      setSelectedServices(new Set());
      toast.success(
        `✅ ส่งแจ้งเตือนทั้งหมด ${selectedList.length} รายการสำเร็จ`
      );
    } catch (err) {
      console.error(err);
      toast.error("❌ เกิดข้อผิดพลาดในการส่ง");
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedServices.size === data.service.length) {
      setSelectedServices(new Set());
    } else {
      setSelectedServices(new Set(data.service.map((s) => s.id)));
    }
  };

  const serverTypeMap: Record<string, string> = {
    vehicleTax: "ภาษีรถยนต์",
    C_M_I: "พรบ.",
    carInsurance: "ประกันรถยนต์",
  };

  return (
    <div className="space-y-6 p-4">
      {/* Token Card */}
      <Card>
        <CardHeader>
          <CardTitle>ตั้งค่า Line Token</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="กรอก Line Token"
            value={lineToken}
            onChange={(e) => setLineToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveToken}>บันทึก</Button>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>รายการที่ยังไม่ได้ส่ง LINE แจ้งเตือน</CardTitle>
          {data.service.length > 0 && (
            <Button
              onClick={handleSendSelected}
              disabled={selectedServices.size === 0}
              variant="default"
            >
              ส่งที่เลือก ({selectedServices.size})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  {data.service.length > 0 && (
                    <Checkbox
                      checked={
                        selectedServices.size === data.service.length &&
                        data.service.length > 0
                      }
                      onCheckedChange={toggleAll}
                    />
                  )}
                </TableHead>
                <TableHead>ประเภทบริการ</TableHead>
                <TableHead>วันที่สิ้นสุด</TableHead>
                <TableHead>เลขทะเบียน</TableHead>
                <TableHead className="text-right">การดำเนินการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.service.length > 0 ? (
                data.service.map((s: Service) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedServices.has(s.id)}
                        onCheckedChange={() => toggleService(s.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {serverTypeMap[s.serviceType] || s.serviceType}
                    </TableCell>
                    <TableCell>
                      {new Date(s.endDate).toLocaleDateString("th-TH")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {s.vehicle.vehicleNumber}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-black"
                        onClick={() => handleSendSingle(s)}
                        disabled={loading[s.id]}
                      >
                        {loading[s.id] ? (
                          "กำลังส่ง..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-1" />
                            ส่ง
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    ✅ ไม่มีรายการที่ต้องส่งแจ้งเตือน
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
