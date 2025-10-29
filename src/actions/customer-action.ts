"use server";
import { cookies } from "next/headers";

export async function customerCreateAction(
  firstName: string,
  lastName: string,
  idCardOrTax: string,
  phone: string
) {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/customer/authorized/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        idCardOrTax,
        phone,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return { success: true, message: data.message };
}

export async function customerGetAllAction(limit = 10, cursor?: string) {
  const token = (await cookies()).get("token")?.value;
  const params = new URLSearchParams();
  params.append("limit", String(limit));
  if (cursor) params.append("cursor", cursor);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/api/v1/customer/authorized/list?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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
    nextCursor: data.nextCursor,
    totalCount: data.totalCount || 0,
  };
}

export async function customerSearchAction(keyword: string) {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST_URL
      }/api/v1/customer/authorized/search?keyword=${encodeURIComponent(
        keyword
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "เกิดข้อผิดพลาด",
        data: [],
      };
    }

    const result = await response.json();
    return { success: true, message: result.message, data: result.data };
  } catch (error) {
    console.error("Error fetching customer search:", error);
    return { success: false, message: "เกิดข้อผิดพลาดขณะค้นหา", data: [] };
  }
}

export async function customerGetMoreAction(customerId: string) {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/api/v1/customer/authorized/getmore?customerId=${encodeURIComponent(
      customerId
    )}`,
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
  return { success: true, message: data.message, data: data.data };
}

export async function customerEditAction(
  customerId: string,
  firstNameE: string,
  lastNameE: string,
  phoneE: string
) {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/api/v1/customer/authorized/edit?customerId=${encodeURIComponent(
      customerId
    )}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstNameE,
        lastName: lastNameE,
        phone: phoneE,
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return { success: true, message: data.message };
}

export async function customerDeleteAction(customerId: string) {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/api/v1/customer/authorized/delete?customerId=${encodeURIComponent(
      customerId
    )}`,
    {
      method: "DELETE",
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
  return { success: true, message: data.message };
}
