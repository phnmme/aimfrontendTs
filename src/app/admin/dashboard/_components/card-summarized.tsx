import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { 
    CarFront, 
    CircleDollarSign,
    TriangleAlert,
    Users 
} from "lucide-react";

// HACK: Hard-Code แบบสุดๆ :/
export default function CardSummarized() {
    return (
        <div className="grid grid-cols-4 gap-10 my-6">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium">
                    ลูกค้าทั้งหมด
                </CardTitle>
                <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">
                    1,200
                </div>
                <p className="text-xs">
                
                </p>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium">
                    รถยนต์ทั้งหมด
                </CardTitle>
                <CarFront className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    543
                </div>
                <p className="text-xs">
                
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium">
                    ใกล้หมดอายุ
                </CardTitle>
                <TriangleAlert className="h-4 w-4" color="yellow" />
            </CardHeader>
            <CardContent className="text-yellow-300 flex flex-row justify-between items-center">
                <div className="text-2xl font-bold">
                    10
                </div>
                <p className="text-xs">
                    คืนในเดือนนี้
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium">
                    รายได้เดือนนี้
                </CardTitle>
                <CircleDollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    ${`11,200`}
                </div>
                <p className="text-xs">
                
                </p>
            </CardContent>
            </Card>
        </div>
    );
}