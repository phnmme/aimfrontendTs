// TODO: Tags Makers WITH changing colors

'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow, TableHeader } from "@/components/ui/table";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BadgeCard from "./badge-card";

// TODO: ทำ interface ให้เหมาะกับข้อมูล
interface Activity {
    vehicle_id: string;
    vehicle_type: string; // TODO: ควรจะเป็น Enumeration
    name: string;
    expired_time: string;   
}

// MOCKUP
const mockActivities: Activity[] = [
    { vehicle_id: "V123", vehicle_type: "พ.ร.บ", name: "นาย ยิ้ม", expired_time: "10 นาทีที่แล้ว" },
    { vehicle_id: "V124", vehicle_type: "พ.ร.บ", name: "นางสาว ฟ้า", expired_time: "15 นาทีที่แล้ว" },
    { vehicle_id: "V125", vehicle_type: "พ.ร.บ", name: "นาย สาย", expired_time: "20 นาทีที่แล้ว" },
    { vehicle_id: "V126", vehicle_type: "พ.ร.บ", name: "นาย ยิ้ม", expired_time: "30 นาทีที่แล้ว" },
    { vehicle_id: "V127", vehicle_type: "พ.ร.บ", name: "นางสาว ฟ้า", expired_time: "45 นาทีที่แล้ว" },
    { vehicle_id: "V128", vehicle_type: "พ.ร.บ", name: "นาย สาย", expired_time: "50 นาทีที่แล้ว" },
];

export default function CardExpirations() {
    const [page, setPage] = useState<number>(1);
    // TODO: ทำ get all count สำหรับการทำ paginations
    const totalPages: number = 5;

    // TODO: ทำตัวเรียกข้อมูล ดัก MAX VALUE

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                        <Bell className="size-4" />
                        ใกล้หมดอายุ
                    </h2>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    บริการที่ใกล้หมดอายุในเร็วๆนี้
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {mockActivities.map((activity, index) => (
                            <TableRow 
                                key={index}
                                className="flex justify-between space-y-2"
                            >
                                <TableCell className="flex flex-col">
                                    <div className="flex items-center space-x-2">
                                        <h3>{`ยานพาหนะ: ${activity.vehicle_id}`}</h3>
                                        <BadgeCard />
                                    </div>
                                    <p className="text-muted-foreground">{activity.name}</p>
                                    <p className="text-sm text-muted-foreground">{activity.expired_time}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant="gradientBorder" size="default">
                    <Link href="/admin/dashboard" className="buttonn-default"></Link>ดูเพิ่มเติม
                </Button>
            </CardFooter>

        </Card>
    );
}
