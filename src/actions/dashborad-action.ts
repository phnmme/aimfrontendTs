"use server";

import { cookies } from "next/headers";

export async function dashboardGetSummaryAction() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}
api/v1/analysis/authorized/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export async function getLog() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/analysis/authorized/getlog`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export async function getTotalGraph() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/analysis/authorized/totalGraph`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
