import { requireAuth } from "@/lib/authGuard";
import TableSearch from "./_components/table-search";

export default async function CustomerPage() {
  await requireAuth();
  return (
    <main>
      <div className="w-full p-8">
        <div>
          <h1 className="font-extrabold bg-gradient-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
            ยินดีต้อนรับสู่หน้าจัดการลูกค้า
          </h1>
          <p className="text-slate-500"> ภาพรวมของ AIM-L</p>
        </div>
        <TableSearch />
      </div>
    </main>
  );
}
