import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  try {
    const res = await fetch(
      "https://preview-api.kivotos.sh/api/v1/auth/guest/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    return { success: true, message: "Login สำเร็จ", token: data.data.token };
  } catch (error) {
    console.error("loginAction error:", error);
    return { success: false, message: "ไม่สามารถเชื่อมต่อ server ได้" };
  }
}
export async function getMe() {
  const token = localStorage.getItem("token");
  const host = process.env.NEXT_PUBLIC_HOST_URL;
  console.log("Host URL:", host);
  const res = await fetch(`${host}api/v1/auth/authorized/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/auth/authorized/logout`,
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

  localStorage.removeItem("token");

  redirect("/landing");
}
