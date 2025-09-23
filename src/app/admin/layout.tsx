"use client";

import Link from "next/link";
import "../globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Shield, Package, History } from "lucide-react";
import Image from "next/image";

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
        <hr className="mt-4" style={{ borderColor: "#2e77b3" }} />
        <ul className="nav-list">
          <li>
            <Link
              href="/admin/dashboard"
              className={pathname === "/admin/dashboard" ? "active" : ""}
            >
              <div className="icon px-2">
                <LayoutDashboard color="#337cdb" />
              </div>
              <span className="links_name">แดชบอร์ด</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/member"
              className={pathname === "/admin/member" ? "active" : ""}
            >
              <div className="lucide px-2 active:bg-gradient-to-r active:from-[#c2e0f9] active:to-[#2e77b3] active:bg-clip-text active:text-transparent">
                <Users />
              </div>
              <span className="links_name">จัดการรถยนต์</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/role"
              className={pathname === "/admin/role" ? "active" : ""}
            >
              <div className="icon px-2">
                <Shield />
              </div>
              <span className="links_name">จัดการลูกค้า</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/stock"
              className={pathname === "/admin/stock" ? "active" : ""}
            >
              <div className="icon px-2">
                <Package />
              </div>
              <span className="links_name">วิเคราะห์ข้อมูล</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/history/order"
              className={pathname === "/admin/history/order" ? "active" : ""}
            >
              <div className="icon px-2">
                <History />
              </div>
              <span className="links_name">ตั้งค่าระบบ</span>
            </Link>
          </li>
          <li className="profile">
            <div className="profile-details">
              <div className="name_job">
                <div className="flex">
                  <div className="self-end text-black text-[12px]">
                    &copy; Copyright 2025 all rights reserved by tumgap
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="app-main bg-aim-background flex flex-col">
        <div className=" shadow-md bg-aim-navbar-top w-full py-5">
          Admin Dashboard
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
