import { requireAuth } from "@/lib/authGuard";
import CardActivities from "./_components/card-activities";
import CardExpirations from "./_components/card-expirations";
import CardSummarized from "./_components/card-summarized";
import {
  dashboardGetSummaryAction,
  getLog,
  getTotalGraph,
} from "@/actions/dashborad-action";
import Recharts from "./_components/recharts";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const auth = await requireAuth();
  if (!auth) {
    return redirect("/landing/auth/login");
  }
  const summary = await dashboardGetSummaryAction();
  const log = await getLog();
  const totalGraph = await getTotalGraph();

  return (
    <main className="w-full p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
          ยินดีต้อนรับสู่หน้าแดชบอร์ด
        </h1>
        <p className="text-slate-500">ภาพรวมของ AIM-L</p>
      </header>

      <section aria-labelledby="summary-section" className="mb-8">
        <h2 id="summary-section" className="sr-only">
          สรุปข้อมูลภาพรวม
        </h2>
        <CardSummarized summary={summary.data} />
      </section>

      <section
        aria-labelledby="activities-section"
        className="flex flex-col md:flex-row  gap-8 mb-8"
      >
        <article aria-label="กิจกรรมล่าสุด" className="flex-1/2">
          <CardActivities log={log.data} />
        </article>

        <article aria-label="ข้อมูลที่ใกล้หมดอายุ" className="flex-1/2">
          <CardExpirations summary={summary.data} />
        </article>
      </section>

      <section aria-labelledby="graph-section">
        <h2 id="graph-section" className="sr-only">
          สถิติและแนวโน้ม
        </h2>
        <Recharts data={totalGraph.data} />
      </section>
    </main>
  );
}
