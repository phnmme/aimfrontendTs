'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow, TableHeader } from "@/components/ui/table";
import { Bell } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// TODO: ทำ interface ให้เหมาะกับข้อมูล
interface Activity {
    name: string;
    activity: string;
    time: string;
}

// MOCKUP
const mockActivities: Activity[] = [
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
    { name: "นาย ยิ้ม", activity: "เพิ่มลูกค้าใหม่", time: "10 นาทีที่แล้ว" },
];

export default function CardActivities() {
    const [page, setPage] = useState<number>(1);
    // TODO: ทำ get all count สำหรับการทำ paginations
    const totalPages: number = 5;

    // TODO: ทำตัวเรียกข้อมูล

    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle>
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                        <Bell className="size-4" />
                        กิจกรรมล่าสุด
                    </h2>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    กิจกรรมที่เกิดขึ้นในระบบล่าสุด
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {/* PREF: จัดการให้เป็น BE-Response */}
                        {mockActivities.map((activity, index) => (
                            <TableRow 
                                key={index}
                                className="flex justify-between space-y-2"
                            >
                                <TableCell className="flex flex-col">
                                    <h3>{activity.activity}</h3>
                                    <p className="text-muted-foreground">{activity.name}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{activity.time}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                {/* TODO: ทำ Pagination เพื่อเก็ตข้อมูลแบบ in-range */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    );
}
