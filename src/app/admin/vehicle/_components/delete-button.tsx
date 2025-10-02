"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteButton() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className=" bg-red-500 hover:bg-red-400 hover:text-white hover:cursor-pointer border-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px] rounded-2xl shadow-xl bg-aim-primary">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-center">
              คุณต้องการลบข้อมูลลูกค้าหรือไม่?
            </DialogTitle>
            <p className="text-sm text-gray-500">
              การลบข้อมูลนี้ไม่สามารถย้อนกลับได้ กรุณาตรวจสอบให้แน่ใจก่อนยืนยัน
            </p>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                ยกเลิก
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-red-500 text-white hover:bg-red-600 shadow-sm"
            >
              ยืนยันการลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
