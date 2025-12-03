"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { Icon } from "@iconify/react";
import Image from "next/image"; // อย่าลืม import Image
import { useStreamStatus } from "@/hooks/stream-status";

// รูปตัวอย่าง (ถ้าไม่มีให้ใช้ Placeholder สีแทนได้)
const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=1778&auto=format&fit=crop",
];

const swiperParams = {
  modules: [Autoplay, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: "fade", // เพิ่ม Effect Fade ให้นุ่มนวล
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const { status } = useStreamStatus();

  // ฟังก์ชัน Toggle Play
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // if (audioRef.current) { ... logic play/pause }
  };

  // ฟังก์ชันปรับเสียง
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  // ฟังก์ชัน Toggle Mute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.5); // คืนค่าเสียงเดิม (Hardcode ไว้ก่อน)
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-gray-900 overflow-hidden">
      {/* --- Main Slider --- */}
      <Swiper {...swiperParams} className="w-full h-full">
        {SLIDE_IMAGES.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-black/40 z-10" />{" "}
            {/* Overlay ให้ตัวหนังสือชัด */}
            <Image
              width={2070}
              height={2070}
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white pb-24">
              <span className="text-red-500 font-bold tracking-widest uppercase mb-2 animate-fade-in-up">
                Live Station
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-center drop-shadow-lg max-w-3xl leading-tight">
                ขับเคลื่อนทุกจังหวะชีวิต <br /> ไปกับศรสินเรดิโอ
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Floating Player Bar --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-4xl">
        {/* แผ่นเสียง (Vinyl) ที่ลอยออกมา */}
        <div
          className={`
            absolute -top-12 right-6 md:right-10 w-32 h-32 rounded-full 
            border-4 border-gray-900/50 shadow-2xl z-40 overflow-hidden bg-black
            transition-transform duration-700 ease-in-out
            ${isPlaying ? "scale-100 rotate-3" : "scale-95 opacity-80"}
        `}
        >
          {/* ตัวหมุนแผ่นเสียง */}
          <div
            className={`relative w-full h-full ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
              alt="Album Art"
              className="w-full h-full object-cover opacity-80"
              width={2070}
              height={2070}
            />
            {/* รูตรงกลางแผ่น */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* ตัวกล่อง Player (Glass Effect) */}
        <div
          className="
            relative w-full h-24 
            rounded-full 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 shadow-2xl
            overflow-hidden
        "
        >
          {/* Background Gradient จางๆ ด้านใน */}
          <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-between h-full px-4 md:px-8 pr-32 md:pr-44">
            {/* Left: Play Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="group cursor-pointer relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40 transition-all hover:scale-105 active:scale-95"
              >
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></span>
                )}
                <Icon
                  icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"}
                  className="text-2xl ml-0.5" // จัดกลาง Play icon นิดหน่อย
                />
              </button>

              {/* Info Text */}
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  {status === "online" ? (
                    <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      ON AIR
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-gray-500/10 border border-gray-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                      OFF AIR
                    </div>
                  )}
                  <span className="text-white/60 text-xs font-medium truncate">
                    FM 101.25 MHz
                  </span>
                </div>
                <h3 className="text-white text-lg font-bold leading-none truncate max-w-[150px] md:max-w-xs drop-shadow-md">
                  รายการข่าวเช้า
                </h3>
                <p className="text-white/70 text-sm truncate">DJ. สมชาย ใจดี</p>
              </div>
            </div>

            {/* Middle/Right: Volume Controls (Hidden on mobile mostly) */}
            <div className="hidden md:flex items-center gap-4 bg-black/20 px-4 py-2 rounded-full border border-white/5">
              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Icon
                  icon={
                    volume === 0 || isMuted
                      ? "ph:speaker-x-fill"
                      : volume < 0.5
                      ? "ph:speaker-low-fill"
                      : "ph:speaker-high-fill"
                  }
                  width={20}
                />
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                className="w-24 h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20"
                style={{
                  background: `linear-gradient(to right, #ef4444 ${
                    volume * 100
                  }%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
