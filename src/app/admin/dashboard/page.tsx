"use client";

import CardActivities from "./_components/card-activities";
import CardExpirations from "./_components/card-expirations";
import CardSummarized from "./_components/card-summarized";
import {
  dashboardGetSummaryAction,
  getLog,
  getTotalGraph,
} from "@/actions/dashborad-action";
import Recharts from "./_components/recharts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logType, summaryType, YearlyData } from "@/types/dashboradType";
import { validateTokenAction } from "@/actions/auth-action";
import MonthlyStatsTable from "./_components/table";

export default function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<summaryType | null>(null);
  const [log, setLog] = useState<logType[] | null>(null);
  const [totalGraph, setTotalGraph] = useState<YearlyData | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const tokenValidation = await validateTokenAction();
      if (!tokenValidation.success) {
        router.push("/landing/auth/login");
      }
    };
    validateToken();

    const fetchData = async () => {
      const summaryData = await dashboardGetSummaryAction();
      const logData = await getLog();
      const totalGraphData = await getTotalGraph();
      console.log("Total Graph Data:", totalGraphData);

      setSummary(summaryData.data);
      setLog(logData.data);
      setTotalGraph(totalGraphData.data);
    };

    fetchData();
  }, [router]);

  return (
    <>
      <main className="w-full p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">
            ยินดีต้อนรับสู่หน้าแดชบอร์ด
          </h1>
          <p className="text-slate-500">ภาพรวมของ AIM-L</p>
        </header>

        <section aria-labelledby="summary-section" className="mb-8">
          <h2 id="summary-section" className="sr-only">
            สรุปภาพรวม
          </h2>
          {summary && <CardSummarized summary={summary} />}
        </section>

        <section
          aria-labelledby="activities-section"
          className="flex flex-col md:flex-row gap-8 mb-8"
        >
          {log && <CardActivities log={log} />}
          {summary && <CardExpirations summary={summary} />}
        </section>

        <section aria-labelledby="graph-section">
          <h2 id="graph-section" className="sr-only">
            Graph Section
          </h2>
          {totalGraph && <Recharts data={totalGraph} />}
        </section>
        <section aria-labelledby="table-section">
          <h2 id="table-section" className="sr-only">
            Table Section
          </h2>
          {totalGraph && <MonthlyStatsTable data={totalGraph} />}
        </section>
      </main>
    </>
  );
}
