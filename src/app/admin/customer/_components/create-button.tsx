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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customerCreateAction } from "@/actions/customer-action";
import { toast } from "sonner";

export default function CreateButton() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idCardOrTax, setIdCardOrTax] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !idCardOrTax || !phone) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    customerCreateAction(firstName, lastName, idCardOrTax, phone)
      .then((result) => {
        toast.success(result.message);
        setOpen(false);
        setTimeout(() => window.location.reload(), 300);
      })
      .catch((error) => {
        setOpen(false);
        toast.error("เกิดข้อผิดพลาด");
        console.error("เกิดข้อผิดพลาด:", error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-aim-primary text-white hover:bg-blue-950">
          เพิ่มลูกค้าใหม่
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-aim-primary">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              เพิ่มลูกค้าใหม่
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="flex gap-3">
              <div className="grid gap-3 flex-1">
                <Label htmlFor="firstName">ชื่อลูกค้า</Label>
                <Input
                  id="firstName"
                  placeholder="ใส่ชื่อลูกค้า"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3 flex-1">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  placeholder="ใส่นามสกุล"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="idCardOrTax">
                เลขบัตรประชาชน หรือ รหัสผู้เสียภาษี
              </Label>
              <Input
                id="idCardOrTax"
                placeholder="ใส่เลขบัตรประชาชน หรือ รหัสผู้เสียภาษี"
                value={idCardOrTax}
                onChange={(e) => setIdCardOrTax(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input
                id="phone"
                placeholder="ใส่เบอร์โทรศัพท์"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100"
                >
                  ยกเลิก
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-aim-secondary text-white hover:bg-blue-950"
              >
                เพิ่มข้อมูล
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
