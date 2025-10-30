"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LineNotificationPanel from "./_components/lineNotificationPanel";
import { MyData } from "@/types/configsite";
import { getSetting } from "@/actions/config-action";
import { validateTokenAction } from "@/actions/auth-action";

export default function ConfigSitePage() {
  const router = useRouter();

  const [data, setData] = useState<MyData | null>(null);
  useEffect(() => {
    const validateToken = async () => {
      const tokenValidation = await validateTokenAction();
      if (!tokenValidation.success) {
        router.push("/landing/auth/login");
      }
    };
    validateToken();

    const fetchData = async () => {
      const data = await getSetting();
      setData(data.data);
    };
    fetchData();
  }, [router]);

  return (
    <main className="w-full p-8">
      <header className="mb-6">
        <h1 className="font-extrabold bg-linear-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
          ยินดีต้อนรับสู่หน้าจัดการตั้งระบบ Line
        </h1>
        <p className="text-slate-500">ภาพรวมของ AIM-L</p>
      </header>

      <section aria-labelledby="customer-management">
        <h2 id="customer-management" className="sr-only">
          รายการลูกค้า
        </h2>
        <article>{data && <LineNotificationPanel data={data} />}</article>
      </section>
    </main>
  );
}
