"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CreateButton from "./create-button";
import MoreButton from "./more-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import {
  customerGetAllAction,
  customerSearchAction,
} from "@/actions/customer-action";
import { customerListType } from "@/types/customerType";
import { toast } from "sonner";
import { PaginationTable } from "./pagination";

export default function TableSearch() {
  const [customers, setCustomers] = useState<customerListType[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [historyCursors, setHistoryCursors] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] =
    useState<customerListType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchCustomers = async (cursor?: string) => {
    const res = await customerGetAllAction(10, cursor || undefined);
    if (res.success) {
      setCustomers(res.data);
      setNextCursor(res.nextCursor || null);
      setTotalCount(res.totalCount || 0);
    }
  };

  useEffect(() => {
    fetchCustomers();

    // ตรวจสอบขนาดหน้าจอ
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchCustomers = () => {
    if (!search) {
      fetchCustomers();
      return;
    }

    customerSearchAction(search)
      .then((result) => {
        if (result.success) {
          setCustomers(result.data);
          toast.success(result.message);
        } else {
          setCustomers([]);
          toast.error(result.message);
        }
        setCurrentPage(1);
        setSearch("");
      })
      .catch((error) => console.error("เกิดข้อผิดพลาด:", error));
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage && nextCursor) {
      setHistoryCursors((prev) => [...prev, cursor || ""]);
      setCursor(nextCursor);
      fetchCustomers(nextCursor);
    } else if (page < currentPage) {
      const prevCursor = historyCursors[page - 2] || null;
      setHistoryCursors((prev) => prev.slice(0, page - 1));
      setCursor(prevCursor);
      fetchCustomers(prevCursor || undefined);
    }
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      {/* 🔍 Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="ค้นหาข้อมูลลูกค้า"
            type="text"
            className="w-full sm:w-80 bg-card border-aim-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={searchCustomers}
            className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600"
          >
            ค้นหา
          </Button>
        </div>
        <CreateButton />
      </div>

      {/* 📱 Responsive Table / Cards */}
      <div
        className="
    mt-4 border bg-card rounded-lg 
    p-2 sm:p-4 md:p-6 
    bg-aim-navbar-top
    overflow-x-auto 
    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
  "
      >
        <div className="min-w-[700px] sm:min-w-full">
          <Table className="w-full text-sm md:text-base">
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
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow
                    key={customer.customerId}
                    className="hover:bg-black/10"
                  >
                    <TableCell className="text-center">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.vehicleCount}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.serviceCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            จัดการ
                          </Button>
                        </DrawerTrigger>

                        <DrawerContent
                          className={`
                      ${
                        isMobile
                          ? "rounded-t-lg pb-6"
                          : "max-w-md mx-auto my-10 rounded-xl shadow-xl border bg-card"
                      }
                    `}
                        >
                          <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                              <DrawerTitle>
                                จัดการลูกค้า: {selectedCustomer?.firstName}{" "}
                                {selectedCustomer?.lastName}
                              </DrawerTitle>
                              <DrawerDescription>
                                เบอร์โทร: {selectedCustomer?.phone}
                              </DrawerDescription>
                            </DrawerHeader>

                            <div className="p-4 flex flex-col gap-3">
                              <MoreButton
                                customerId={selectedCustomer?.customerId ?? ""}
                              />
                              <EditButton
                                customerId={selectedCustomer?.customerId ?? ""}
                                firstName={selectedCustomer?.firstName ?? ""}
                                lastName={selectedCustomer?.lastName ?? ""}
                                phone={selectedCustomer?.phone ?? ""}
                              />
                              <DeleteButton />
                            </div>

                            <DrawerFooter>
                              <DrawerClose asChild>
                                <Button
                                  variant="outline"
                                  className="w-full sm:w-auto"
                                >
                                  ปิด
                                </Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no-data">
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    ไม่พบข้อมูลลูกค้า
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="my-4">
        <PaginationTable
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / 10)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
