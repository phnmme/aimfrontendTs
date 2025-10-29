"use client";

import Link from "next/link";
import "../globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CircleUserRound,
  LogOut,
  Car,
  X,
  Menu,
  Cog,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { getMe, logoutAction } from "@/actions/auth-action";
import { User } from "@/types/customerType";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [close, setClose] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSidebar = () => setClose((prev) => !prev);

  // ตรวจสอบขนาดหน้าจอ
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleGetMe = async () => {
      const res = await getMe();
      if (res.success) {
        setUser(res.data);
      }
    };

    handleGetMe();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: <LayoutDashboard />,
      name: "แดชบอร์ด",
    },
    {
      href: "/admin/customer",
      icon: <Users />,
      name: "จัดการลูกค้า",
    },
    {
      href: "/admin/vehicle",
      icon: <Car />,
      name: "จัดการรถยนต์",
    },
    {
      href: "/admin/configsite",
      icon: <Cog />,
      name: "ตั้งค่าระบบ",
    },
  ];

  return (
    <div className="flex min-h-screen bg-aim-background text-white">
      {/* Overlay สำหรับ Mobile */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 print:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar print:hidden
        ${isMobile ? (menuOpen ? "translate-x-0" : "") : ""}
        ${!isMobile && close ? "close" : ""}`}
      >
        <div className="logo-details">
          <Image
            src="/assets/images/aiml.svg"
            width={150}
            height={150}
            alt="Logo"
            className="cursor-pointer"
            priority
          />
        </div>

        <Separator className="mt-4 bg-gray-600" />

        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                <div className="icon">{item.icon}</div>
                <span className="links_name">{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Profile Section */}
          <li className="profile">
            <div className="flex items-center gap-3">
              <div className="bg-aim-secondary p-2 rounded-lg flex-shrink-0">
                <CircleUserRound color="#ffffff" size={24} />
              </div>
              {(!close || isMobile) && (
                <div className="flex flex-col overflow-hidden">
                  <p className="links_name truncate">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-slate-500 text-sm truncate">ผู้ดูแลระบบ</p>
                </div>
              )}
              <div
                onClick={handleLogout}
                className="ml-auto hover:bg-[#0f172a] p-2 rounded-lg transition-all cursor-pointer flex-shrink-0"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLogout();
                  }
                }}
              >
                <LogOut color="#ffffff" size={20} />
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${
          !isMobile ? (close ? "ml-[78px]" : "ml-[250px]") : "ml-0"
        }`}
      >
        {/* Top Navbar */}
        <div className="shadow-md bg-aim-navbar-top w-full z-40 fixed p-4 flex items-center gap-4 print:hidden">
          {isMobile ? (
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-[#1f2937] transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-[#1f2937] transition"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          )}

          <div className="flex-1 overflow-hidden">
            <h2 className="text-aim-secondary font-bold text-lg truncate">
              แดชบอร์ด
            </h2>
            <p className="text-slate-500 text-sm truncate">{pathname}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-20 px-4 pb-4">{children}</div>
        <Toaster />
      </div>
    </div>
  );
}
