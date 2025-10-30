"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TableSearch from "./_components/table-search";
import { validateTokenAction } from "@/actions/auth-action";

export default function CustomerPage() {
  const router = useRouter();
  useEffect(() => {
    const validateToken = async () => {
      const tokenValidation = await validateTokenAction();
      if (!tokenValidation.success) {
        router.push("/landing/auth/login");
      }
    };
    validateToken();
  }, [router]);

  return (
    <main className="w-full p-8">
      <header className="mb-6">
        <h1 className="font-extrabold bg-linear-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
          ยินดีต้อนรับสู่หน้าจัดการลูกค้า
        </h1>
        <p className="text-slate-500">ภาพรวมของ AIM-L</p>
      </header>

      <section aria-labelledby="customer-management">
        <h2 id="customer-management" className="sr-only">
          รายการลูกค้า
        </h2>
        <article>
          <TableSearch />
        </article>
      </section>
    </main>
  );
}
