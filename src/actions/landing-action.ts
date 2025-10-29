export async function vehicleSearchGuestAction(keyword: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST_URL
      }/api/v1/vehicle/guest/search?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
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
