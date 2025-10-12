"use client";

import { useState } from "react";
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
import { FilePlus } from "lucide-react";

export enum ServiceType {
  TAX = "vehicleTax",
  CMI = "C_M_I",
  CAR_INSURANCE = "carInsurance",
}

export default function EditButton() {
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.TAX);
  const [startDate, setStartDate] = useState("2024-09-25");
  const [endDate, setEndDate] = useState("2025-09-25");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("กรุณาเลือกไฟล์ก่อน");
      return;
    }

    const formData = new FormData();
    formData.append("serviceType", serviceType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("file", file);

    try {
      const res = await fetch("/api/service/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("อัพเดตสำเร็จ!");
      } else {
        alert(`เกิดข้อผิดพลาด: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดระหว่างอัพโหลดไฟล์");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-600 hover:bg-green-700 hover:text-white hover:cursor-pointer border-green-600"
        >
          <FilePlus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-aim-primary">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลบริการ</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Service Type */}
          <div className="grid gap-2">
            <Label htmlFor="serviceType">ประเภทบริการ</Label>
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

          {/* Start Date */}
          <div className="grid gap-2">
            <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div className="grid gap-2">
            <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div className="grid gap-2">
            <Label htmlFor="file">อัพโหลดไฟล์ (PDF, PNG, JPG)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              required
            />
            {file && (
              <p className="text-sm text-gray-500">ไฟล์ที่เลือก: {file.name}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              บันทึก
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
