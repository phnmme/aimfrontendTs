"use server";

import { cookies } from "next/headers";

export async function dashboardGetSummaryAction() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}
/api/v1/analysis/authorized/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("Response from dashboardGetSummaryAction:", res);
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return {
    success: true,
    message: data.message,
    data: data.data,
  };
}
