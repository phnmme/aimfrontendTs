import "./globals.css";
import { Bai_Jamjuree } from "next/font/google";
// import GlobalLoading from "./GlobalLoading";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={baiJamjuree.className}>
        {/* <GlobalLoading></GlobalLoading> */}
        {children}
      </body>
    </html>
  );
}
