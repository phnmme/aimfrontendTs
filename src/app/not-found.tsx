// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-700">
        404
      </h1>
      <h2 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-100">
        Oops! หน้านี้ไม่พบ
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        หน้าเว็บที่คุณกำลังค้นหาไม่มีอยู่จริง หรืออาจถูกย้ายไปแล้ว
      </p>

      <Link href="/admin/dashboard">
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
          กลับไปหน้าหลัก
        </Button>
      </Link>
    </div>
  );
}
