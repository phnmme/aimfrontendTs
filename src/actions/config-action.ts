export async function getSetting() {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/configsite/authorized/settings`,
    {
      headers: {
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

export async function updateSettingAction(value: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/configsite/authorized/editLineToken`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return { success: true, message: data.message };
}

export async function sendLineNotification(
  customerId: string,
  vehicleNumber: string,
  serviceType: string,
  endDate: string,
  serviceId: string
) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}api/v1/configsite/authorized/sendNotification`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId, vehicleNumber, serviceType, endDate }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message };
  }
  return { success: true, message: data.message };
}
