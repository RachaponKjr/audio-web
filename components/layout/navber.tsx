import StatusStream from "@/app/_components/status-stream";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        {/* --- ส่วนที่ 1: โลโก้ --- */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative transition-transform group-hover:scale-105 duration-300">
            <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Image
              src="/logo.png"
              alt="Sornsin Radio Logo"
              width={56}
              height={56}
              className="relative rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-800 tracking-tight group-hover:text-red-600 transition-colors">
              สถานี ศรสินเรดิโอ
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                FM 101.25 MHz
              </span>
            </div>
          </div>
        </div>

        {/* --- ส่วนที่ 2: Contact & Actions (ขวา) --- */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* 2.1 Desktop Layout (ซ่อนบนมือถือ) */}
          <div className="hidden lg:flex items-center gap-6 mr-2">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110"
              >
                {/* Facebook Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors transform hover:scale-110"
              >
                {/* Line/Message Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 5.86 2 10.61C2 13.9 4.2 16.78 7.49 18.23L6.46 21.82C6.39 22.06 6.64 22.28 6.88 22.18L11.55 20.35C11.7 20.36 11.85 20.36 12 20.36C17.52 20.36 22 16.5 22 11.75C22 7 17.52 2 12 2ZM13.06 14.86L10.96 12.63L7.96 14.86C7.62 15.09 7.18 14.77 7.34 14.39L9.44 9.14C9.57 8.81 10 8.71 10.27 8.97L12.37 11.2L15.37 8.97C15.71 8.74 16.15 9.06 15.99 9.44L13.89 14.69C13.76 15.02 13.33 15.12 13.06 14.86Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors transform hover:scale-110"
              >
                {/* TikTok/Media Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Phone Number (Desktop) */}
            <a
              href="tel:0850514477"
              className="flex flex-col items-end group/phone"
            >
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                ติดต่อโฆษณา
              </span>
              <div className="flex items-center gap-1.5 text-gray-700 group-hover/phone:text-red-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-bold font-mono text-lg leading-none">
                  085-051-4477
                </span>
              </div>
            </a>
          </div>

          {/* 2.2 Mobile Layout (แสดงเฉพาะมือถือ) */}
          <a
            href="tel:0850514477"
            className="lg:hidden flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-full border border-red-100 transition-all active:scale-95"
          >
            <div className="bg-white p-1 rounded-full shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold opacity-70">
                ติดต่อโฆษณา
              </span>
              <span className="text-xs font-bold font-mono">085-051-4477</span>
            </div>
          </a>
          <div className="hidden md:block">
            <StatusStream />
          </div>
        </div>
      </div>
    </nav>
  );
}
