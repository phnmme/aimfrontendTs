"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const customerData = {
  id: "b679a7e8-249c-4105-acf1-36ac69071164",
  firstName: "phone",
  lastName: "sucksis",
  phone: "0661234567",
  vehicles: [
    {
      id: "2cd968fb-457e-4732-9ade-d0bad27556f1",
      vehicleNumber: "งง1133",
      services: [
        {
          id: "d60196c4-f7a7-437f-9bc9-7dbf16c187c1",
          serviceType: "C_M_I",
          createdAt: "2025-09-30T13:30:18.345Z",
        },
        {
          id: "08ac0228-a262-42a7-ac52-7ab53469aa9d",
          serviceType: "vehicleTax",
          createdAt: "2025-08-30T13:29:04.813Z",
        },
      ],
    },
    {
      id: "1ee82314-acbe-4470-9dd3-8003178ce43f",
      vehicleNumber: "งง-1234",
      services: [
        {
          id: "6be7f53f-2eee-4e65-b011-a4505797cd52",
          serviceType: "vehicleTax",
          createdAt: "2025-09-28T14:40:52.071Z",
        },
      ],
    },
    {
      id: "1ee82314-acbe-4470-9dd3-8003178ce43a",
      vehicleNumber: "งง-1234",
      services: [
        {
          id: "6be7f53f-2eee-4e65-b011-a4505797cd52",
          serviceType: "vehicleTax",
          createdAt: "2025-09-28T14:40:52.071Z",
        },
      ],
    },
    {
      id: "1ee82314-acbe-4470-9dd3-8003178ce43t",
      vehicleNumber: "งง-1234",
      services: [
        {
          id: "6be7f53f-2eee-4e65-b011-a4505797cd52",
          serviceType: "vehicleTax",
          createdAt: "2025-09-28T14:40:52.071Z",
        },
      ],
    },
  ],
};

export default function MoreButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600 hover:cursor-pointer"
        >
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-aim-primary">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            ข้อมูลลูกค้า
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <p className="mb-2">
            <span className="font-semibold">ชื่อ:</span>{" "}
            {customerData.firstName} {customerData.lastName}
          </p>
          <p className="mb-4">
            <span className="font-semibold">เบอร์โทร:</span>{" "}
            {customerData.phone}
          </p>

          <div className="max-h-80 overflow-y-auto">
            {customerData.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="mb-4 p-3 border rounded-lg shadow-sm "
              >
                <p className="font-semibold mb-2">
                  รถ: {vehicle.vehicleNumber}
                </p>
                <div className="ml-2">
                  {vehicle.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between text-sm mb-1 px-2 py-1 rounded shadow"
                    >
                      <span>{service.serviceType}</span>
                      <span className="text-gray-500">
                        {new Date(service.createdAt).toLocaleDateString(
                          "th-TH"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="hover:cursor-pointer border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100">
              ปิด
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
