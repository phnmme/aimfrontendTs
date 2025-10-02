import { redirectIfAuth } from "@/lib/authGuard";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  await redirectIfAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-aim-primary dark:from-gray-900 dark:to-gray-950">
      <LoginForm />
    </div>
  );
}
