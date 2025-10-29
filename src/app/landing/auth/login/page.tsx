import { redirectIfAuth } from "@/lib/authGuard";
import LoginForm from "./_components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const auth = await redirectIfAuth();
  if (auth) {
    redirect("/admin/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-aim-primary dark:from-gray-900 dark:to-gray-950">
      <LoginForm />
    </div>
  );
}
