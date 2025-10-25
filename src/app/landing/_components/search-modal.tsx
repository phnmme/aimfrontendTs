"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { vehicleSearchGuestAction } from "@/actions/landing-action";
import { Vehicle } from "@/types/landingType";

export default function LicenseSearchModal() {
  const [open, setOpen] = useState(false);
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Vehicle[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmed = plate.trim();
    if (!trimmed) {
      setError("กรุณาใส่เลขทะเบียนรถ");
      return;
    }

    setLoading(true);
    setResult([]);

    try {
      const res = await vehicleSearchGuestAction(trimmed);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถค้นหาได้ ลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 text-lg"
      >
        เริ่มต้นค้นหาวันหมดอายุของรถคุณ
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle>ค้นหาเลขทะเบียนรถ</DialogTitle>
            <DialogDescription>
              ใส่เลขทะเบียนแล้วกดค้นหาเพื่อดูวันหมดอายุ ภาษี/พรบ/ประกัน
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSearch} className="mt-4 space-y-4">
            <Input
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              placeholder="เช่น 1กก1234"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังค้นหา..." : "ค้นหา"}
              </Button>
            </div>
          </form>

          {result.length > 0 && (
            <div className="mt-6 space-y-6">
              {result.map((vehicle, index) => (
                <div key={index} className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-blue-700 border-b-2 border-blue-200 pb-2">
                      ทะเบียน: {vehicle.vehicleNumber}
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {vehicle.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="border-l-4 border-blue-500  rounded-r-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col space-y-1">
                            <span className="font-semibold text-lg text-white">
                              {service.serviceType === "vehicleTax" &&
                                "ภาษีรถยนต์"}
                              {service.serviceType === "C_M_I" && "พรบ."}
                              {service.serviceType === "carInsurance" &&
                                "ประกันภัย"}
                            </span>
                            <span className="text-sm text-gray-600 font-medium">
                              เริ่มต้น:{" "}
                              {service.startDate
                                ? new Date(
                                    service.startDate
                                  ).toLocaleDateString("th-TH")
                                : "ไม่มีข้อมูล"}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-2">
                              <span className="text-xs text-red-600 font-medium block">
                                วันหมดอายุ
                              </span>
                              <span className="font-bold text-red-700">
                                {service.endDate
                                  ? new Date(
                                      service.endDate
                                    ).toLocaleDateString("th-TH")
                                  : "ไม่มีข้อมูล"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
