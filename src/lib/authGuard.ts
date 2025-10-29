// src/lib/auth.ts
import { cookies } from "next/headers";

export async function requireAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return;
  }

  return token;
}

export async function redirectIfAuth() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    return token;
  }
  return;
}
