"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth-action";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("กรุณากรอกอีเมลที่ถูกต้อง");
      return;
    }

    if (!password || password.length < 4) {
      setMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร");
      return;
    }

    const result = await loginAction(email, password);

    setMessage(result.message);

    if (result.success && result.token) {
      localStorage.setItem("token", result.token);
      router.push("/admin/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          เข้าสู่ระบบ
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="^[a-zA-Z0-9]+$"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <LogIn className="h-4 w-4" />
            เข้าสู่ระบบ
          </Button>

          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>

        {/* <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          ยังไม่มีบัญชี?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            สมัครสมาชิก
          </a>
        </div> */}
      </CardContent>
    </Card>
  );
}
