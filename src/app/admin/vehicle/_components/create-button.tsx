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

export default function CreateButton() {
  return (
    <Dialog>
      <form>
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
              <Input
                placeholder="ค้นหาข้อมูลลูกค้า"
                type="text"
                id="customer-search"
                className="  bg-card border-aim-primary "
              />
            </div>
            <div className="flex gap-4">
              <div className="grid gap-3">
                <Label htmlFor="firstName-1">ชื่อลูกค้า</Label>
                <Input
                  id="firstName-1"
                  name="firstName"
                  placeholder="ใส่ชื่อลูกค้า"
                  disabled
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName-1">นามสกุล</Label>
                <Input
                  id="lastName-1"
                  name="lastName"
                  placeholder="ใส่นามสกุล"
                  disabled
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="vehicleNumber-1">ทะเบียนรถ</Label>
              <Input
                id="vehicleNumber-1"
                name="vehicleNumber"
                placeholder="ใส่ทะเบียนรถ (ตัวอย่าง: กข1234)"
              />
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
              เพิ่มข้อมูล
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
