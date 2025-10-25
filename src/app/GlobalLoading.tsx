"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function GlobalLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-700 backdrop-blur-sm flex items-center justify-center z-99">
          <div className="w-32 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse" />
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm" />
              <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="flex gap-1 items-center">
                  <Image
                    src="/assets/images/aimlogo.svg"
                    width={100}
                    height={100}
                    alt="Logo"
                    className="animate-pulse"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300" />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
