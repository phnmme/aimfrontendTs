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

const vehicles = [
  {
    id: "3f8f3314-8d63-45a5-87d3-e8755e848434",
    vehicleNumber: "คง1234",
    customerId: "a8681fb3-4fd9-42b4-bfd5-a89c4b28d68c",
    firstName: "God",
    lastName: "phnmme",
    phone: "0902743545",
  },
  {
    id: "4a9a4425-9e74-56b6-98e4-f9866f959545",
    vehicleNumber: "กท5678",
    customerId: "b9792gc4-5fe0-53c5-cge6-b90d5c39e79d",
    firstName: "John",
    lastName: "Doe",
    phone: "0812345678",
  },
  {
    id: "5b0b5536-0f85-67c7-09f5-g0977g060656",
    vehicleNumber: "นค9012",
    customerId: "c0803hd5-6gf1-64d6-dhf7-c01e6d40f80e",
    firstName: "Jane",
    lastName: "Smith",
    phone: "0823456789",
  },
  {
    id: "6c1c6647-1g96-78d8-10g6-h1088h171767",
    vehicleNumber: "ชบ3456",
    customerId: "d1914ie6-7hg2-75e7-eig8-d12f7e51g91f",
    firstName: "Mike",
    lastName: "Johnson",
    phone: "0834567890",
  },
];

const datamock = {
  id: "2cd968fb-457e-4732-9ade-d0bad27556f1",
  customerId: "b679a7e8-249c-4105-acf1-36ac69071164",
  vehicleNumber: "งง1133",
  createdAt: "2025-09-15T15:34:14.493Z",
  customer: {
    id: "b679a7e8-249c-4105-acf1-36ac69071164",
    branchId: "7d06686c-e293-4a57-a7af-51ddb3591e8e",
    idCardOrTax: "yXCy+Epu06jFpIqPdWYu+L2nzGUnGFhqcBuwgzA=:yn2JUJkIeB/f0jxE",
    firstName: "phone",
    lastName: "sucksis",
    phone: "0661234567",
    key: "62C3+9q8iyEXSPkRjTZW4ngbbbNdPwb942BIhyRS3CI=",
    createdAt: "2025-09-15T15:22:32.453Z",
  },
  services: [
    {
      id: "d60196c4-f7a7-437f-9bc9-7dbf16c187c1",
      vehicleId: "2cd968fb-457e-4732-9ade-d0bad27556f1",
      serviceType: "C_M_I",
      startDate: "2024-10-20T00:00:00.000Z",
      endDate: "2025-10-20T00:00:00.000Z",
      pdfName: "1759070451904_fd5dde4c5e295777bc1ed0618b7f2469.pdf",
      imageName: "1759239018099_311b44e988742b7583c45afdb7e698ba.png",
      createdAt: "2025-09-30T13:30:18.345Z",
    },
    {
      id: "08ac0228-a262-42a7-ac52-7ab53469aa9d",
      vehicleId: "2cd968fb-457e-4732-9ade-d0bad27556f1",
      serviceType: "vehicleTax",
      startDate: "2024-10-05T00:00:00.000Z",
      endDate: "2025-10-05T00:00:00.000Z",
      pdfName: "1759070451904_fd5dde4c5e295777bc1ed0618b7f2469.pdf",
      imageName: "1759238944510_6904c0e0975957387ab19c89ad913e85.png",
      createdAt: "2025-08-30T13:29:04.813Z",
    },
  ],
};

export default function TableSearch() {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <Input
          placeholder="ค้นหาทะเบียนรถ"
          type="text"
          id="vehicleNumber-search"
          className="w-1/3  bg-card border-aim-primary "
        />
        <CreateButton />
      </div>

      <div className="bg-aim-navbar-top rounded-lg bg-card border mt-4 p-4">
        <Table className=" ">
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
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="text-center">
                  {vehicle.vehicleNumber}
                </TableCell>
                <TableCell className="text-center">
                  {vehicle.firstName} {vehicle.lastName}
                </TableCell>
                <TableCell className="text-center">{vehicle.phone}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <MoreButton data={datamock} />
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
