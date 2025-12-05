import type { Metadata } from "next";
// 1. เปลี่ยนการ import เป็น Kanit
import { Kanit } from "next/font/google";
import "./globals.css";

// 2. ตั้งค่าฟอนต์ Kanit
const kanit = Kanit({
  subsets: ["thai", "latin"], // สำคัญ: ต้องใส่ thai เพื่อให้สระไม่ลอยและอ่านไทยได้
  weight: ["300", "400", "500", "600", "700"], // เลือกความหนาที่ต้องการใช้
  variable: "--font-kanit", // ชื่อตัวแปรสำหรับ Tailwind (ถ้าใช้)
});

export const metadata: Metadata = {
  title: "สถานีวิทยุ ศรสินเรดิโอ",
  description: "สถานีวิทยุ ศรสินเรดิโอ FM 101.25 MHz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.className} antialiased`}>{children}</body>
    </html>
  );
}
