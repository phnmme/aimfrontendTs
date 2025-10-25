"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SlipPreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const slip = data ? JSON.parse(decodeURIComponent(data)) : null;

  if (!slip) return <p className="p-6">ไม่มีข้อมูล</p>;

  return (
    <div>
      {/* ปุ่ม print */}
      <div className="mt-4 text-center print-hidden">
        <Button onClick={() => window.print()}>🖨️ พิมพ์ / บันทึก PDF</Button>
      </div>

      {/* container slip */}
      <div
        id="printable"
        className="p-4 max-w-[210mm] mx-auto bg-white print:p-2"
        style={{ minHeight: "297mm" }}
      >
        {/* ใบเสร็จ 2 ใบ */}
        <div className="flex flex-col h-full justify-between">
          {[1, 2].map((_, i) => (
            <div key={i} className="p-4 border border-gray-300 mb-4 relative">
              {i === 0 && (
                <div className="absolute bottom-0 left-0 w-full border-b border-dashed border-gray-400" />
              )}

              <h2 className="text-center font-bold text-xl mb-2">
                Tum gap kao mai pen
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <span className="font-semibold">เลขทะเบียน:</span>{" "}
                  {slip.registration}
                </div>
                <div>
                  <span className="font-semibold">ชื่อ-นามสกุล:</span>{" "}
                  {slip.customer}
                </div>
                <div>
                  <span className="font-semibold">เบอร์โทร:</span> {slip.phone}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-1">รายการสินค้า</h3>
                <div className="grid grid-cols-2 gap-2 font-semibold border-b border-gray-300 p-1">
                  <span>รายละเอียด</span>
                  <span>ราคา</span>
                </div>
                {slip.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 p-1"
                  >
                    <span>{item.name}</span>
                    <span>{item.price} บาท</span>
                  </div>
                ))}
              </div>

              <div className="text-right font-bold text-lg mt-2">
                รวมทั้งหมด: {slip.total} บาท
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
