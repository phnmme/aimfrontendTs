"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const res = await fetch("http://localhost:4000/api/v1/auth/guest/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message };
  }

  (await cookies()).set("token", data.data.token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60,
  });

  redirect("/admin/dashboard");
}
