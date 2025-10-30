"use client";
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
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import MoreButton from "./more-button";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { vehicleListType } from "@/types/vehicleType";
import {
  vehicleGetAllAction,
  vehicleSearchAction,
} from "@/actions/vehicle-action";
import { PaginationTable } from "./pagination";
import {
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

export default function TableSearch() {
  const [vehicles, setVehicles] = useState<vehicleListType[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [historyCursors, setHistoryCursors] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [selectedVehicle, setSelectedVehicle] =
    useState<vehicleListType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchVehicles = async (cursor?: string) => {
    const res = await vehicleGetAllAction(10, cursor || undefined);
    if (res.success) {
      setVehicles(res.data);
      setNextCursor(res.nextCursor || null);
      setTotalCount(res.totalCount || 0);
    }
  };

  useEffect(() => {
    fetchVehicles();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchVehicles = () => {
    if (!search) {
      fetchVehicles();
      return;
    }

    vehicleSearchAction(search)
      .then((result) => {
        if (result.success) {
          setVehicles(result.data);
          toast.success(result.message);
        } else {
          setVehicles([]);
          toast.error(result.message);
        }
        setCurrentPage(1);
        setSearch("");
      })
      .catch((error) => console.error("เกิดข้อผิดพลาด:", error));
  };

  useEffect(() => {
    console.log("Vehicles updated:", vehicles);
  }, [vehicles]);

  const handlePageChange = (page: number) => {
    if (page > currentPage && nextCursor) {
      setHistoryCursors((prev) => [...prev, cursor || ""]);
      setCursor(nextCursor);
      fetchVehicles(nextCursor);
    } else if (page < currentPage) {
      const prevCursor = historyCursors[page - 2] || null;
      setHistoryCursors((prev) => prev.slice(0, page - 1));
      setCursor(prevCursor);
      fetchVehicles(prevCursor || undefined);
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
            searchVehicles();
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
    overflow-hidden
    -mx-2 sm:mx-0
  "
      >
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <Table
            className="w-full text-xs sm:text-sm md:text-base min-w-[650px]"
            aria-labelledby="customer-table-section"
          >
            <caption className="sr-only" id="customer-table-section">
              ตารางข้อมูลลูกค้า
            </caption>
            <TableHeader>
              <TableRow className="bg-black/20 hover:bg-black/20">
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  ทะเบียน
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  ชื่อลูกค้า
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  เบอร์โทรศัพท์
                </TableHead>
                <TableHead className="text-aim-primary text-center text-xs sm:text-sm whitespace-nowrap">
                  จัดการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <TableRow
                    key={vehicle.vehicleId}
                    className="hover:bg-black/10"
                  >
                    <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {vehicle.vehicleNumber}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {vehicle.firstName} {vehicle.lastName}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {vehicle.phone}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedVehicle(vehicle)}
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
                                ทะเบียน: {selectedVehicle?.vehicleNumber}
                              </DrawerTitle>
                              <DrawerDescription className="text-sm">
                                จัดการลูกค้า: {selectedVehicle?.firstName}{" "}
                                {selectedVehicle?.lastName}
                              </DrawerDescription>
                            </DrawerHeader>
                            <section className="p-0 sm:p-4 flex flex-col gap-2 sm:gap-3">
                              <MoreButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
                              />
                              <EditButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
                              />
                              <DeleteButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
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
                    colSpan={4}
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
