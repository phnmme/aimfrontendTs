import { Badge } from "@/components/ui/badge";

export type BadgeType = "someone" | "something"; 
// TODO: specify based on that system design
export type ExpireDayRange = {
    5: "bg-red",
    30: "bg-yellow",
    _: ""
};

// TODO: Injectable
export default function BadgeCard() {
    return (
        <Badge variant="warning">
            ทดสอบ
        </Badge>
    )
}