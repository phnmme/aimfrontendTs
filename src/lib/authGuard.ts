// src/lib/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/landing");
  }

  return token;
}

export async function redirectIfAuth() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    redirect("/admin/dashboard");
  }
  return token;
}
