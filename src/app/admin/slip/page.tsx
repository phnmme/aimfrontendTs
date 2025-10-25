import { requireAuth } from "@/lib/authGuard";
import SlipFormPage from "./_components/slip-form";

export default async function SlipPage() {
  await requireAuth();
  return (
    <main>
      <div className=" w-full p-8">
        <div>
          <h1 className="font-extrabold bg-gradient-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
            ยินดีต้อนรับสู่หน้าใบเสร็จรับเงิน
          </h1>
          <p className="text-slate-500"> ภาพรวมของ AIM-L</p>
        </div>
        <SlipFormPage />
      </div>
    </main>
  );
}
