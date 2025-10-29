export async function dashboardGetSummaryAction() {
  const token = localStorage.getItem("token");
  const host = process.env.NEXT_PUBLIC_HOST_URL;
  console.log("Host URL:", host);
  const res = await fetch(host + "api/v1/analysis/authorized/summary", {
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

export async function getLog() {
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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
