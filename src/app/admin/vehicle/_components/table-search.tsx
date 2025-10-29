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

    const handleResize = () => setIsMobile(window.innerWidth < 640);
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
    <div className="mt-8">
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
            onClick={searchVehicles}
            className="bg-blue-500 hover:bg-blue-400 hover:text-white border-blue-600"
          >
            ค้นหา
          </Button>
        </div>
        <CreateButton />
      </div>

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
                  ทะเบียน
                </TableHead>
                <TableHead className="text-aim-primary text-center">
                  ชื่อลูกค้า
                </TableHead>
                <TableHead className="text-aim-primary text-center">
                  เบอร์โทรศัพท์
                </TableHead>
                <TableHead className="text-aim-primary text-center">
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
                    <TableCell className="text-center">
                      {vehicle.vehicleNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {vehicle.firstName} {vehicle.lastName}
                    </TableCell>
                    <TableCell className="text-center">
                      {vehicle.phone}
                    </TableCell>
                    <TableCell className="text-center">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="text-blue-600 bg-blue-200 border border-blue-700 hover:bg-blue-500"
                          >
                            จัดการ
                          </Button>
                        </DrawerTrigger>

                        <DrawerContent
                          className={`
                      ${
                        isMobile
                          ? "rounded-t-lg pb-6"
                          : "max-w-2xl mx-auto my-10 rounded-t-xl shadow-xl border-t bg-card"
                      }
                    `}
                        >
                          <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                              <DrawerTitle className="text-white">
                                ทะเบียน: {selectedVehicle?.vehicleNumber}
                              </DrawerTitle>
                              <DrawerDescription>
                                จัดการลูกค้า: {selectedVehicle?.firstName}{" "}
                                {selectedVehicle?.lastName}
                              </DrawerDescription>
                            </DrawerHeader>

                            <div className="p-4 flex flex-col gap-3">
                              <MoreButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
                              />
                              <EditButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
                              />
                              <DeleteButton
                                vehicleId={selectedVehicle?.vehicleId ?? ""}
                              />
                            </div>

                            <DrawerFooter>
                              <DrawerClose asChild>
                                <Button
                                  variant="outline"
                                  className="w-full sm:w-auto text-black hover:bg-gray-300  border-gray-300"
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
