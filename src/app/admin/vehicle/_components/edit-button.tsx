"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, FilePlus, Upload } from "lucide-react";
import { vehicleuploadAction } from "@/actions/vehicle-action";
import { toast } from "sonner";

export enum ServiceType {
  TAX = "vehicleTax",
  CMI = "C_M_I",
  CAR_INSURANCE = "carInsurance",
}
interface Props {
  vehicleId: string;
}

export default function EditButton({ vehicleId }: Props) {
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.TAX);
  const [startDate, setStartDate] = useState("2024-09-25");
  const [endDate, setEndDate] = useState("2025-09-25");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSaveAll = async () => {
    if (!file) {
      alert("กรุณาเลือกไฟล์ก่อนบันทึก");
      return;
    }

    setLoading(true);

    const res = await vehicleuploadAction(
      vehicleId,
      serviceType,
      startDate,
      endDate,
      file
    );
    setLoading(false);
    if (res.success) {
      toast.success("บันทึกข้อมูลสำเร็จ");
      setFile(null);

      setFileName("");

      setStartDate("");
      setEndDate("");
      setServiceType(ServiceType.TAX);
      setOpen(false);
      setTimeout(() => window.location.reload(), 300);
    } else {
      toast.error("เกิดข้อผิดพลาด: " + res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-600 hover:bg-green-700 hover:text-white border-green-600"
        >
          <FilePlus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-aim-primary space-y-5">
        <DialogHeader>
          <DialogTitle>เพิ่มข้อมูลบริการ</DialogTitle>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>ประเภทบริการ</Label>
          <Select
            value={serviceType}
            onValueChange={(val) => setServiceType(val as ServiceType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกประเภทบริการ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ServiceType.TAX}>Vehicle Tax</SelectItem>
              <SelectItem value={ServiceType.CMI}>C_M_I</SelectItem>
              <SelectItem value={ServiceType.CAR_INSURANCE}>
                Car Insurance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>วันที่เริ่มต้น</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>วันที่สิ้นสุด</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>อัพโหลดไฟล์ (PDF, PNG, JPG)</Label>

          <div
            onClick={() => inputRef.current?.click()}
            className="
          flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300 hover:border-blue-400
          rounded-xl bg-card hover:bg-blue-100 transition
          p-6 cursor-pointer text-center
          
        "
          >
            <FileDown className="w-10 h-10 text-gray-500 mb-2" />
            {fileName ? (
              <>
                <p className="text-sm font-medium text-gray-700">{fileName}</p>
                <p className="text-xs text-gray-400 mt-1">
                  คลิกเพื่อเปลี่ยนไฟล์
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  รองรับ .pdf, .png, .jpg
                </p>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100"
            >
              ยกเลิก
            </Button>
          </DialogClose>
          <Button
            onClick={handleSaveAll}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600"
          >
            {loading ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
