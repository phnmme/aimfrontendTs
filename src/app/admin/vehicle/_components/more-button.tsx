"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { vehicleGetMoreType } from "@/types/vehicleType";
import { vehicleGetMoreAction } from "@/actions/vehicle-action";

interface MoreButtonProps {
  vehicleId: string;
}
export default function MoreButton({ vehicleId }: MoreButtonProps) {
  const URL = process.env.NEXT_PUBLIC_HOST_URL;
  const [vehicleData, setVehicleData] = useState<vehicleGetMoreType | null>(
    null
  );
  useEffect(() => {
    const fetchMoreData = async () => {
      const res = await vehicleGetMoreAction(vehicleId);
      setVehicleData(res.data);
    };
    fetchMoreData();
  }, [vehicleId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 hover:text-white hover:cursor-pointer border-blue-600"
        >
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-aim-primary">
        <DialogHeader>
          <DialogTitle>รายละเอียดรถ {vehicleData?.vehicleNumber}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="font-semibold">ข้อมูลลูกค้า</h3>
          <p>
            ชื่อ: {vehicleData?.customer.firstName}{" "}
            {vehicleData?.customer.lastName}
          </p>
          <p>โทร: {vehicleData?.customer.phone}</p>
          <p>
            ลงทะเบียนวันที่:{" "}
            {vehicleData?.createdAt
              ? new Date(vehicleData.createdAt).toLocaleDateString()
              : "ไม่มีข้อมูล"}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">รายการบริการ</h3>
          {vehicleData?.services && vehicleData.services.length > 0 ? (
            vehicleData.services.map((service) => (
              <div key={service.id} className="border p-2 rounded mb-2">
                <p>ประเภท: {service.serviceType}</p>
                <p>
                  ระยะเวลา: {new Date(service.startDate).toLocaleDateString()} -{" "}
                  {new Date(service.endDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  {service.pdfName && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      onClick={() =>
                        window.open(
                          `${URL}api/v1/file/authorized/file/${service.pdfName}`,
                          "_blank"
                        )
                      }
                    >
                      เปิด PDF
                    </Button>
                  )}
                  {service.imageName && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      onClick={() =>
                        window.open(
                          `${URL}api/v1/file/authorized/file/${service.imageName}`,
                          "_blank"
                        )
                      }
                    >
                      เปิด Image
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">ไม่มีข้อมูลบริการ</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100"
            >
              ปิด
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
