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

export default function EditButton() {
  const [firstName, setFirstName] = useState("โชคดี");
  const [lastName, setLastName] = useState("มีชัย");
  const [phone, setPhone] = useState("0812345678");

  const [editing, setEditing] = useState<
    null | "firstName" | "lastName" | "phone"
  >(null);

  return (
    <Dialog>
      <form>
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
            {/* ---------------- ชื่อจริง ---------------- */}
            <div className="grid gap-3">
              {editing === "firstName" ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={firstName}
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
                  <Label>ชื่อจริง : {firstName}</Label>
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
                    value={lastName}
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
                  <Label>นามสกุล : {lastName}</Label>
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
                    value={phone}
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
                  <Label>เบอร์โทรศัพท์ : {phone}</Label>
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
              <Button className="hover:cursor-pointer border border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-aim-primary ">
                ยกเลิก
              </Button>
            </DialogClose>
            <Button
              className="bg-aim-secondary hover:cursor-pointer text-white hover:bg-blue-950 hover:text-white"
              type="submit"
            >
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
