"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/guest/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }

  (await cookies()).set("token", data.data.token, {
    name: "token",
    value: data.data.token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60,
    sameSite: "none",
  });

  redirect("/admin/dashboard");
}

export async function getMe() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/authorized/me`,
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

export async function logoutAction() {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/auth/authorized/logout`,
    {
      method: "POST",
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

  const cookieStore = await cookies();
  cookieStore.delete({ name: "token", path: "/" });
  redirect("/login");
}
