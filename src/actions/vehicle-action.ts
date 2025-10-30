import { ServiceType } from "./../app/admin/vehicle/_components/edit-button";

export async function vehicleGetAllAction(limit = 10, cursor?: string) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();
  params.append("limit", String(limit));
  if (cursor) params.append("cursor", cursor);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }api/v1/vehicle/authorized/list?${params.toString()}`,
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

export async function vehicleSearchAction(keyword: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST_URL
      }api/v1/vehicle/authorized/search?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Error occurred while searching vehicles:", error);
    return { success: false, message: "เกิดข้อผิดพลาด" };
  }
}

export async function vehicleGetMoreAction(vehicleId: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST_URL
    }api/v1/vehicle/authorized/getmore?vehicleId=${encodeURIComponent(
      vehicleId
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
  return {
    success: true,
    message: data.message,
    data: data.data,
  };
}

export async function vehicleCreateAction(
  vehicleNumber: string,
  customerId: string
) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/vehicle/authorized/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vehicleNumber, customerId }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Error occurred while creating vehicle:", error);
    return { success: false, message: "เกิดข้อผิดพลาด" };
  }
}

export async function vehicleuploadAction(
  vehicleId: string,
  serviceType: ServiceType,
  startDate: string,
  endDate: string,
  file: File
) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("vehicleId", vehicleId);
  formData.append("serviceType", serviceType);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("file", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/vehicle/authorized/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error uploading vehicle data:", error);
    return { success: false, message: "เกิดข้อผิดพลาดขณะอัพโหลดข้อมูล" };
  }
}

export async function vehicleDeleteAction(vehicleId: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST_URL
      }api/v1/vehicle/authorized/delete?vehicleId=${encodeURIComponent(
        vehicleId
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Error occurred while deleting vehicle:", error);
    return { success: false, message: "เกิดข้อผิดพลาด" };
  }
}
