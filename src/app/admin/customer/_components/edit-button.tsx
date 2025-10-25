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
import { Pencil, Check, X, Cog } from "lucide-react";
import { customerEditAction } from "@/actions/customer-action";
import { toast } from "sonner";

interface EditButtonProps {
  firstName?: string;
  lastName?: string;
  phone?: string;
  customerId: string;
}

export default function EditButton({
  customerId,
  firstName,
  lastName,
  phone,
}: EditButtonProps) {
  const [open, setOpen] = useState(false);
  const [firstNameE, setFirstName] = useState(firstName || "");
  const [lastNameE, setLastName] = useState(lastName || "");
  const [phoneE, setPhone] = useState(phone || "");
  const [editing, setEditing] = useState<
    null | "firstName" | "lastName" | "phone"
  >(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await customerEditAction(
      customerId,
      firstNameE,
      lastNameE,
      phoneE
    );
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      setEditing(null);
      setTimeout(() => window.location.reload(), 300);
    } else {
      toast.error(result.message);
      setOpen(false);
      setEditing(null);
    }
  };

  const closeDialog = () => {
    setEditing(null);
    setFirstName(firstName || "");
    setLastName(lastName || "");
    setPhone(phone || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orange-500 hover:bg-orange-400 hover:text-white hover:cursor-pointer border-orange-600"
        >
          <Cog />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-aim-primary">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            ข้อมูลลูกค้า
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* ---------------- ชื่อ ---------------- */}
          <div className="grid gap-3">
            {editing === "firstName" ? (
              <div className="flex items-center gap-2">
                <Input
                  value={firstNameE}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Label>ชื่อจริง : {firstNameE}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing("firstName")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* ---------------- นามสกุล ---------------- */}
          <div className="grid gap-3">
            {editing === "lastName" ? (
              <div className="flex items-center gap-2">
                <Input
                  value={lastNameE}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Label>นามสกุล : {lastNameE}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing("lastName")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* ---------------- เบอร์โทร ---------------- */}
          <div className="grid gap-3">
            {editing === "phone" ? (
              <div className="flex items-center gap-2">
                <Input
                  value={phoneE}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(null)}
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Label>เบอร์โทรศัพท์ : {phoneE}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing("phone")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={closeDialog}
              className="border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100"
            >
              ยกเลิก
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
