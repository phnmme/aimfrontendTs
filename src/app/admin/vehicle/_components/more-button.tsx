"use client";

import { useState } from "react";
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
import { Eye, X } from "lucide-react";

interface Service {
  id: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  pdfName: string | null;
  imageName: string | null;
}

interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
}

interface VehicleData {
  vehicleNumber: string;
  createdAt: string;
  customer: Customer;
  services: Service[];
}

interface MoreButtonProps {
  data: VehicleData;
}

export default function MoreButton({ data }: MoreButtonProps) {
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
          <DialogTitle>รายละเอียดรถ {data.vehicleNumber}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="font-semibold">ข้อมูลลูกค้า</h3>
          <p>
            ชื่อ: {data.customer.firstName} {data.customer.lastName}
          </p>
          <p>โทร: {data.customer.phone}</p>
          <p>
            ลงทะเบียนวันที่: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">รายการบริการ</h3>
          {data.services.map((service) => (
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
                        `http://localhost:4000/api/v1/file/authorized/file/${service.pdfName}`,
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
                        `http://localhost:4000/api/v1/file/authorized/file/${service.imageName}`,
                        "_blank"
                      )
                    }
                  >
                    เปิด Image
                  </Button>
                )}
              </div>
            </div>
          ))}
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
