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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Person, PersonSearch } from "./combo";
import { useState } from "react";
import { toast } from "sonner";
import { vehicleCreateAction } from "@/actions/vehicle-action";

export default function CreateButton() {
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerson || !vehicleNumber) {
      toast("กรุณาเลือกลูกค้าและกรอกทะเบียนรถ");
      return;
    }

    vehicleCreateAction(vehicleNumber, selectedPerson.id)
      .then((res) => {
        toast.success(res.message);
        setSelectedPerson(null);
        setVehicleNumber("");
        setOpen(false);
        setTimeout(() => window.location.reload(), 300);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาดในการเพิ่มรถ");
        console.error(err);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-aim-primary hover:cursor-pointer text-white hover:bg-blue-950 hover:text-white">
          เพิ่มรถให้ลูกค้า
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-aim-primary">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            เพิ่มรถให้ลูกค้า
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3 my-2">
            <PersonSearch onSelect={(person) => setSelectedPerson(person)} />
          </div>
          <div className="flex gap-4">
            <div className="grid gap-3">
              <Label htmlFor="firstName">ชื่อลูกค้า</Label>
              <Input
                id="firstName"
                type="text"
                value={selectedPerson?.firstName || ""}
                placeholder="ใส่ชื่อจริง"
                pattern="^[\u0E00-\u0E7F\u0020-\u007E]*$"
                title="กรุณาใช้ตัวอักษรภาษาไทยหรืออังกฤษเท่านั้น"
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input
                id="lastName"
                value={selectedPerson?.lastName || ""}
                placeholder="ใส่นามสกุล"
                pattern="^[\u0E00-\u0E7F\u0020-\u007E]*$"
                title="กรุณาใช้ตัวอักษรภาษาไทยหรืออังกฤษเท่านั้น"
                disabled
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="vehicleNumber">ทะเบียนรถ</Label>
            <Input
              id="vehicleNumber"
              placeholder="ใส่ทะเบียนรถ"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              pattern="^[\u0E00-\u0E7F]+[0-9]+$"
              title="กรุณาใช้ตัวอักษรภาษาไทยและตามด้วยตัวเลขเท่านั้น"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-aim-primary">
              ยกเลิก
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-aim-secondary text-white hover:bg-blue-950"
            onClick={handleSubmit}
          >
            เพิ่มข้อมูล
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
