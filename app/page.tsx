import Image from "next/image";
import HomePage from "./_components/home-page";
import StatusStream from "./_components/status-stream";
import Navbar from "@/components/layout/navber";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* เนื้อหาหลัก */}
      <main className="flex-1">
        <HomePage />
      </main>
    </div>
  );
}
