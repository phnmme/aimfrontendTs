import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Boxes, Calendar, CarFront } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Demo data (match the screenshot)
const rows = [
  { plate: "รห 426", kind: "พรบ", date: "29 กรกฎาคม 2568" },
  { plate: "รห 426", kind: "ประกัน", date: "29 กรกฎาคม 2568" },
  { plate: "รห 426", kind: "ภาษี", date: "29 กรกฎาคม 2568" },
  { plate: "รห 426", kind: "ประกัน", date: "29 กรกฎาคม 2568" },
];

export default function TableCustomer() {
  return (
    <div className="w-full mx-auto p-6">
      <div className="rounded-2xl shadow">
        <Table>
          <TableHeader className="bg-aim-navbar-left">
            <TableRow>
              <TableHead>
                <div className="flex gap-2">
                    เลขทะเบียน
                    <CarFront size={18}/>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex gap-2">
                    ต่ออายุ
                    <Boxes size={18}/>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex gap-2">
                    วันที่บันทึก
                    <Calendar size={18}/>
                </div>
              </TableHead>
              <TableHead className="text-right">  </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow 
                key={i}
                className="border-b border-primary-foreground/20"    
            >
                <TableCell className="font-medium">{r.plate}</TableCell>
                <TableCell>{r.kind}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="secondary" className="rounded-full">เพิ่มเติม</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}