"use client";

import Link from "next/link";
import "../globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  Package,
  History,
  CircleUserRound,
  LogOut,
  Car,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [close, setClose] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <div
        // onMouseEnter={() => setClose(true)}
        // onMouseLeave={() => setClose(false)}
        className={`${close ? "close" : ""} sidebar`}
      >
        <div className="logo-details flex justify-center mt-3">
          <Image
            src="/assets/images/aiml.svg"
            width={150}
            height={150}
            alt="Logo"
            className="cursor-pointer"
          />
        </div>
        <Separator className="mt-4" />
        <ul className="nav-list">
          <li>
            <Link
              href="/admin/dashboard"
              className={pathname === "/admin/dashboard" ? "active" : ""}
            >
              <div className="icon px-2">
                <LayoutDashboard />
              </div>
              <span className="links_name">แดชบอร์ด</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/customer"
              className={pathname === "/admin/customer" ? "active" : ""}
            >
              <div className="icon px-2">
                <Users />
              </div>
              <span className="links_name">จัดการลูกค้า</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/vehicle"
              className={pathname === "/admin/vehicle" ? "active" : ""}
            >
              <div className="icon px-2 ">
                <Car />
              </div>
              <span className="links_name">จัดการรถยนต์</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/analytics"
              className={pathname === "/admin/analytics" ? "active" : ""}
            >
              <div className="icon px-2">
                <Package />
              </div>
              <span className="links_name">วิเคราะห์ข้อมูล</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/configsite"
              className={pathname === "/admin/configsite" ? "active" : ""}
            >
              <div className="icon px-2">
                <History />
              </div>
              <span className="links_name">ตั้งค่าระบบ</span>
            </Link>
          </li>
          <li className="profile">
            <Separator className="mb-2" />
            <div className="flex">
              <div className="bg-aim-secondary p-2 rounded-lg">
                <CircleUserRound color="#ffffff" />
              </div>
              <div className="flex flex-col my-auto">
                <p>
                  <span className="links_name ml-3">Admin User</span>
                </p>
                <p>
                  <span className="text-slate-500 ml-3 text-sm">
                    ผู้ดูแลระบบ
                  </span>
                </p>
              </div>
              <div className="ml-auto my-auto hover:cursor-pointer hover:bg-[#0f172a] p-2 rounded-lg transition-all">
                <LogOut color="#ffffff" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="app-main bg-aim-background flex flex-col">
        <div className="shadow-md bg-aim-navbar-top w-full z-40 fixed p-4">
          {/* TODO: Headers ต้องลิ้งกันกับ แต่ละ pages (path) */}
          <h2 className="text-aim-secondary font-bold"> แดชบอร์ด </h2>
          <p className="text-slate-500"> {pathname} </p>
        </div>
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
}
