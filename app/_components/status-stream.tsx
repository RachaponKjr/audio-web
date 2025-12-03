"use client";

import { useStreamStatus } from "@/hooks/stream-status";

const StatusStream = () => {
  const { status, listeners } = useStreamStatus();

  // --- UI: Loading State ---
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 bg-gray-100 text-gray-400 px-5 py-2.5 rounded-full font-medium border border-gray-200 animate-pulse cursor-wait">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span className="text-sm">Connecting...</span>
      </div>
    );
  }

  // --- UI: Offline State ---
  if (status === "offline") {
    return (
      <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-5 py-2.5 rounded-full font-medium border border-gray-200 cursor-not-allowed opacity-80">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span className="text-sm">Off Air</span>
      </div>
    );
  }

  // --- UI: Online State (สวยจัดเต็ม) ---
  return (
    <button className="flex items-center gap-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 active:scale-95 group">
      {/* ส่วนแสดงสถานะ Live */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="tracking-wide text-sm font-bold">LIVE</span>
      </div>

      {/* เส้นแบ่ง */}
      <div className="w-px h-4 bg-white/20"></div>

      {/* ส่วนแสดงคนฟัง */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-red-50">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
        </svg>
        <span>{listeners}</span>
      </div>
    </button>
  );
};

export default StatusStream;
