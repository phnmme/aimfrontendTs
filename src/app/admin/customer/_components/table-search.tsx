"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateButton from "./create-button";
import MoreButton from "./more-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

const customers = [
  {
    id: 1,
    name: "นาย สมชาย ใจดี",
    phone: "0812345678",
    vehicleCount: 2,
    serviceCount: 5,
  },
  {
    id: 2,
    name: "นาง สมหญิง แสนสวย",
    phone: "0898765432",
    vehicleCount: 1,
    serviceCount: 3,
  },
  {
    id: 3,
    name: "นาย สมปอง รวยมาก",
    phone: "0823456789",
    vehicleCount: 4,
    serviceCount: 2,
  },
  {
    id: 4,
    name: "นางสาว สมฤดี น่ารัก",
    phone: "0887654321",
    vehicleCount: 3,
    serviceCount: 4,
  },
];

export default function TableSearch() {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <Input
          placeholder="ค้นหาข้อมูลลูกค้า"
          type="text"
          id="customer-search"
          className="w-1/3  bg-card border-aim-primary "
        />
        <CreateButton />
      </div>

      <div className="bg-aim-navbar-top rounded-lg bg-card border mt-4 p-4">
        <Table className=" ">
          <TableHeader>
            <TableRow className="bg-black/20 hover:bg-black/20">
              <TableHead className="text-aim-primary text-center">
                ชื่อลูกค้า
              </TableHead>
              <TableHead className="text-aim-primary text-center">
                เบอร์โทรศัพท์
              </TableHead>
              <TableHead className="text-aim-primary text-center">
                จำนวนยานพาหนะ
              </TableHead>
              <TableHead className="text-aim-primary text-center">
                จำนวนบริการ
              </TableHead>
              <TableHead className="text-aim-primary text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="text-center">{customer.name}</TableCell>
                <TableCell className="text-center">{customer.phone}</TableCell>
                <TableCell className="text-center">
                  {customer.vehicleCount}
                </TableCell>
                <TableCell className="text-center">
                  {customer.serviceCount}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <MoreButton />
                    <EditButton />
                    <DeleteButton />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
