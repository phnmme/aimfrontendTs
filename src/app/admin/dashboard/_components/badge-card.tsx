import { Badge } from "@/components/ui/badge";

export function BadgeCardType({ serviceType }: { serviceType?: string }) {
  let displayText = "ไม่ระบุประเภท";

  if (serviceType === "carInsurance") {
    displayText = "ประกัน";
  } else if (serviceType === "C_M_I") {
    displayText = "พรบ.";
  } else if (serviceType === "vehicleTax") {
    displayText = "ภาษีรถยนต์ ";
  }

  return <Badge variant="outline">{displayText}</Badge>;
}

export function BadgeCardDate({ endDate }: { endDate?: string }) {
  if (!endDate) {
    return <Badge variant="warning">ไม่ระบุวันที่หมดอายุ</Badge>;
  }

  const currentDate = new Date();
  const parsedEndDate = new Date(endDate);
  const timeDiff = parsedEndDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <Badge
      variant={daysLeft > 5 ? "warning" : "destructive"}
      className="text-white"
    >
      {daysLeft > 0 ? `${daysLeft} วัน` : "หมดอายุแล้ว"}
    </Badge>
  );
}
