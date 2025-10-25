"use client";

import { customerGetMoreAction } from "@/actions/customer-action";
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
import { customerGetMoreType } from "@/types/customerType";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface MoreButtonProps {
  customerId: string;
}

export default function MoreButton({ customerId }: MoreButtonProps) {
  const [customerData, setCustomerData] = useState<customerGetMoreType | null>(
    null
  );
  useEffect(() => {
    const fetchMoreData = async () => {
      const result = await customerGetMoreAction(customerId);
      setCustomerData(result.data);
    };
    fetchMoreData();
  }, [customerId]);
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
            {customerData?.firstName} {customerData?.lastName}
          </p>
          <p className="mb-4">
            <span className="font-semibold">เบอร์โทร:</span>{" "}
            {customerData?.phone}
          </p>

          <div className="max-h-80 overflow-y-auto">
            {customerData?.vehicles && customerData.vehicles.length > 0 ? (
              customerData.vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="mb-4 p-3 border rounded-lg shadow-sm "
                >
                  <p className="font-semibold mb-2">
                    รถ: {vehicle.vehicleNumber}
                  </p>
                  <div className="ml-2">
                    {vehicle.services && vehicle.services.length > 0 ? (
                      vehicle.services.map((service) => (
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
                      ))
                    ) : (
                      <p className="text-center text-gray-500 text-sm">
                        ไม่มีบริการ
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">ไม่มีข้อมูลรถ</p>
            )}
          </div>
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
