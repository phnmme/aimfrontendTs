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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    <section
      className="mt-4 sm:mt-8 px-2 sm:px-0"
      aria-labelledby="customer-table-section"
    >
      <header className="flex flex-col sm:flex-row justify-between items-stretch gap-3 mb-4">
        <form
          className="flex gap-2 w-full sm:w-auto flex-1 sm:flex-initial"
          onSubmit={(e) => {
            e.preventDefault();
            searchCustomers();
          }}
          role="search"
          aria-label="ค้นหาลูกค้า"
        >
          <Input
            placeholder="ค้นหาข้อมูลลูกค้า"
            type="text"
            className="flex-1 sm:w-80 bg-card border-aim-primary text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600 whitespace-nowrap px-4 sm:px-6 text-sm sm:text-base"
          >
            ค้นหา
          </Button>
        </form>

        <div className="w-full sm:w-auto">
          <CreateButton />
        </div>
      </header>

      <article
        className="
          border bg-card rounded-lg 
          p-2 sm:p-4 md:p-6 
          bg-aim-navbar-top
          overflow-x-auto 
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
          -mx-2 sm:mx-0
        "
      >
        <div className="min-w-[700px] sm:min-w-full">
          <Table
            className="w-full text-xs sm:text-sm md:text-base"
            aria-labelledby="customer-table-section"
          >
            <caption className="sr-only" id="customer-table-section">
              ตารางข้อมูลลูกค้า
            </caption>
            <TableHeader>
              <TableRow className="bg-black/20 hover:bg-black/20">
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  ชื่อลูกค้า
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  เบอร์โทรศัพท์
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  จำนวนยานพาหนะ
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  จำนวนบริการ
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
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
                    <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {customer.vehicleCount}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {customer.serviceCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                            className="text-blue-600 bg-blue-200 border border-blue-700 hover:bg-blue-500 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 whitespace-nowrap"
                          >
                            จัดการ
                          </Button>
                        </DrawerTrigger>

                        <DrawerContent
                          className={`${
                            isMobile
                              ? "rounded-t-lg pb-6 h-auto max-h-[85vh]"
                              : "max-w-2xl mx-auto my-10 rounded-t-xl shadow-xl border-t bg-card"
                          }`}
                        >
                          <div className="mx-auto w-full max-w-sm px-4 sm:px-0">
                            <DrawerHeader className="px-0 sm:px-6">
                              <DrawerTitle className="text-white text-base sm:text-lg">
                                จัดการลูกค้า: {selectedCustomer?.firstName}{" "}
                                {selectedCustomer?.lastName}
                              </DrawerTitle>
                              <DrawerDescription className="text-sm">
                                เบอร์โทร: {selectedCustomer?.phone}
                              </DrawerDescription>
                            </DrawerHeader>

                            <section className="p-0 sm:p-4 flex flex-col gap-2 sm:gap-3">
                              <MoreButton
                                customerId={selectedCustomer?.customerId ?? ""}
                              />
                              <EditButton
                                customerId={selectedCustomer?.customerId ?? ""}
                                firstName={selectedCustomer?.firstName ?? ""}
                                lastName={selectedCustomer?.lastName ?? ""}
                                phone={selectedCustomer?.phone ?? ""}
                              />
                              <DeleteButton
                                customerId={selectedCustomer?.customerId ?? ""}
                              />
                            </section>

                            <DrawerFooter className="px-0 sm:px-6 pb-4 sm:pb-6">
                              <DrawerClose asChild>
                                <Button
                                  variant="outline"
                                  className="w-full sm:w-auto text-black hover:bg-gray-300 border-gray-300"
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
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-400 py-8 text-sm"
                  >
                    ไม่พบข้อมูลลูกค้า
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </article>

      <footer className="my-4 px-2 sm:px-0">
        <PaginationTable
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / 10)}
          onPageChange={handlePageChange}
        />
      </footer>
    </section>
  );
}
