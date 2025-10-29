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

export default async function DashboardPage() {
  await requireAuth();
  const summary = await dashboardGetSummaryAction();
  const log = await getLog();
  const totalGraph = await getTotalGraph();
  // console.log("totalGraph", totalGraph);
  return (
    <main>
      <div className=" w-full p-8">
        <div>
          <h1 className="font-extrabold bg-gradient-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
            ยินดีต้อนรับสู่หน้าแดชบอร์ด
          </h1>
          <p className="text-slate-500"> ภาพรวมของ AIM-L</p>
        </div>
        <CardSummarized summary={summary.data} />
        <div className="md:flex gap-8 ">
          <CardActivities log={log.data} />
          <CardExpirations summary={summary.data} />
        </div>
        <Recharts data={totalGraph.data} />
      </div>
    </main>
  );
}
