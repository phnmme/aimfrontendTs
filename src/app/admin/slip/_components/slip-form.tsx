"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SlipFormPage() {
  const router = useRouter();
  const [registration, setRegistration] = useState("");
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([{ name: "", price: 0 }]);
  const [total, setTotal] = useState(0);

  // รวมราคาทั้งหมด
  useEffect(() => {
    const sum = items.reduce((acc, i) => acc + i.price, 0);
    setTotal(sum);
  }, [items]);

  const handleAddItem = () => setItems([...items, { name: "", price: 0 }]);

  const handleSubmit = () => {
    const data = { registration, customer, phone, items, total };
    const encoded = encodeURIComponent(JSON.stringify(data));
    router.push(`admin/slip/preview?data=${encoded}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 bg-card border text-card-foreground rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>เลขทะเบียน</Label>
          <Input
            placeholder="กรอกเลขทะเบียน"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
          />
        </div>
        <div>
          <Label>ชื่อ-นามสกุล</Label>
          <Input
            placeholder="นายสมชาย ใจดี"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div>
          <Label>เบอร์โทร</Label>
          <Input
            placeholder="0812345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">รายการสินค้า</h2>
        <div className="grid grid-cols-2 gap-2 font-semibold border-b border-gray-300 p-2">
          <span>รายละเอียด</span>
          <span>ราคา</span>
        </div>
        {items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 p-2"
          >
            <Input
              placeholder="รายละเอียด"
              value={item.name}
              onChange={(e) => {
                const newItems = [...items];
                newItems[i].name = e.target.value;
                setItems(newItems);
              }}
            />
            <Input
              type="number"
              placeholder="ราคา"
              value={item.price}
              onChange={(e) => {
                const newItems = [...items];
                newItems[i].price = Number(e.target.value);
                setItems(newItems);
              }}
            />
          </div>
        ))}

        <Button
          variant="outline"
          onClick={handleAddItem}
          className="bg-aim-secondary text-white hover:bg-blue-950 mt-2"
        >
          เพิ่มรายการ
        </Button>
      </div>

      <div className="text-right font-bold text-xl">
        รวมทั้งหมด: {total} บาท
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} className="px-8 py-2">
          สร้างใบเสร็จ
        </Button>
      </div>
    </div>
  );
}
