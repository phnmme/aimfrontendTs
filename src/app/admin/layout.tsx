"use client";

import Link from "next/link";
import "../globals.css";
import { useEffect, useState } from "react";
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
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [close, setClose] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-aim-background text-white">
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`sidebar fixed top-0 left-0 h-full z-50 bg-[#17213a] text-white transition-all duration-500
        ${isMobile ? (menuOpen ? "translate-x-0" : "-translate-x-full") : ""}
        ${!isMobile && close ? "w-[78px]" : "w-[250px]"}`}
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

        <Separator className="mt-4 bg-gray-600" />
        <ul className="nav-list mt-8">
          {[
            {
              href: "/admin/dashboard",
              icon: <LayoutDashboard />,
              name: "แดชบอร์ด",
            },
            { href: "/admin/customer", icon: <Users />, name: "จัดการลูกค้า" },
            { href: "/admin/vehicle", icon: <Car />, name: "จัดการรถยนต์" },
            {
              href: "/admin/configsite",
              icon: <History />,
              name: "ตั้งค่าระบบ",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                  pathname === item.href
                    ? "bg-[#00226c80] shadow-inner text-[#89b6db]"
                    : "hover:bg-[#00226c50]"
                }`}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                <div className="icon px-2">{item.icon}</div>
                {!close && <span className="links_name">{item.name}</span>}
              </Link>
            </li>
          ))}

          <li className="profile absolute bottom-5 left-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="bg-aim-secondary p-2 rounded-lg">
                <CircleUserRound color="#ffffff" />
              </div>
              {!close && (
                <div className="flex flex-col">
                  <p className="links_name">Admin User</p>
                  <p className="text-slate-500 text-sm">ผู้ดูแลระบบ</p>
                </div>
              )}
              <div className="ml-auto hover:bg-[#0f172a] p-2 rounded-lg transition-all cursor-pointer">
                <LogOut color="#ffffff" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${
          !isMobile ? (close ? "ml-[78px]" : "ml-[250px]") : ""
        }`}
      >
        {/* Navbar */}
        <div className="shadow-md bg-aim-navbar-top w-full z-40 fixed p-4 flex items-center gap-4">
          {isMobile ? (
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-[#1f2937] transition"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          ) : (
            <button className="p-2 rounded-lg hover:bg-[#1f2937] transition"></button>
          )}

          <div>
            <h2 className="text-aim-secondary font-bold text-lg">แดชบอร์ด</h2>
            <p className="text-slate-500 text-sm">{pathname}</p>
          </div>
        </div>

        {/* Page content */}
        <div className="mt-20 px-4 ">{children}</div>
        <Toaster />
      </div>
    </div>
  );
}
