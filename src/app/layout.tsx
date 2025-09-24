import "./globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
