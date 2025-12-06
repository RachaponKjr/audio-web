"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useStreamStatus } from "@/hooks/stream-status";

// รูปตัวอย่าง
const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=1778&auto=format&fit=crop",
];

const swiperParams = {
  modules: [Autoplay, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};

const STREAM_URL = "https://สถานีวิทยุศรสินเรดิโอ.com/radio";

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // ดึงสถานะสตรีม
  const { status, name_audio, description_audio } = useStreamStatus();

  // เช็คว่าเป็น Online หรือไม่
  const isOnline = status === "online";

  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect: ถ้าสถานะเปลี่ยนเป็น Offline ให้หยุดเล่นทันที
  useEffect(() => {
    if (!isOnline && isPlaying) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isOnline, isPlaying]);

  // --- ลบ useEffect เดิมที่ใช้สั่ง play() ออก ---
  // การสั่ง play ใน useEffect มักจะโดน Mobile Browser บล็อก เพราะถือว่าไม่ใช่ User Interaction โดยตรง

  // Effect: จัดการ Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!isOnline || !audioRef.current) return; // ถ้าไม่ออนไลน์ ห้ามทำงาน

    if (isPlaying) {
      // ถ้ากำลังเล่นอยู่ ให้หยุด
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // ถ้าหยุดอยู่ ให้เล่น (เรียก play() ทันทีใน Event Handler นี้)
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
        // เพิ่ม Alert เพื่อ debug บนมือถือถ้าจำเป็น
        // alert("Cannot play audio: " + error);
      }
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(volume === 0 ? 0.5 : volume);
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-gray-900 overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        crossOrigin="anonymous"
        playsInline // สำคัญสำหรับ Mobile บางรุ่น
      />

      {/* --- Main Slider --- */}
      <Swiper {...swiperParams} className="w-full h-full">
        {SLIDE_IMAGES.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              width={2070}
              height={2070}
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white pb-24">
              <span
                className={`font-bold tracking-widest uppercase mb-2 ${
                  isOnline ? "text-red-500 animate-fade-in-up" : "text-gray-400"
                }`}
              >
                {isOnline ? "Live Station" : "Station Off Air"}
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
        {/* แผ่นเสียง (Vinyl) */}
        <div
          className={`
            absolute md:-top-12 -top-8 right-6 md:right-10 md:w-32 md:h-32 w-28 h-28 rounded-full 
            border-4 shadow-2xl z-40 overflow-hidden bg-black
            transition-all duration-700 ease-in-out
            ${
              isOnline
                ? isPlaying
                  ? "scale-100 rotate-3 border-gray-900/50"
                  : "scale-95 opacity-80 border-gray-900/50"
                : "scale-90 opacity-0 border-gray-600 grayscale" // ซ่อนแผ่นเสียงถ้า Offline
            }
        `}
        >
          <div
            className={`relative w-full h-full ${
              isPlaying && isOnline ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
              alt="Album Art"
              className="w-full h-full object-cover opacity-80"
              width={2070}
              height={2070}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  isOnline ? "bg-red-500" : "bg-gray-500"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* ตัวกล่อง Player */}
        <div
          className={`
            relative w-full h-24 
            rounded-full 
            backdrop-blur-xl border shadow-2xl overflow-hidden transition-colors duration-500
            ${
              isOnline
                ? "bg-white/10 border-white/20"
                : "bg-gray-900/80 border-gray-700/50" // เปลี่ยนสีพื้นหลังถ้า Offline
            }
        `}
        >
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isOnline
                ? "bg-linear-to-r from-red-500/10 via-transparent to-transparent opacity-100"
                : "opacity-0"
            }`}
          />

          <div className="flex items-center justify-between h-full px-4 md:px-8 pr-32 md:pr-44">
            {/* Left: Play Controls */}
            <div className="flex items-center gap-2 md:gap-6">
              <button
                onClick={togglePlay}
                disabled={!isOnline}
                className={`
                  group relative flex items-center justify-center w-14 h-14 rounded-full 
                  transition-all duration-300 shadow-lg
                  ${
                    isOnline
                      ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/40 hover:scale-105 active:scale-95 cursor-pointer"
                      : "bg-gray-700 text-gray-500 shadow-none cursor-not-allowed opacity-50" // สไตล์ตอนปิด
                  }
                `}
              >
                {isPlaying && isOnline && (
                  <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></span>
                )}
                <Icon
                  icon={
                    !isOnline
                      ? "ph:prohibit-bold"
                      : isPlaying
                      ? "ph:pause-fill"
                      : "ph:play-fill"
                  }
                  className="text-2xl ml-0.5"
                />
              </button>

              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  {isOnline ? (
                    <div className="flex text-nowrap items-center gap-1.5 bg-red-500/20 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      ON AIR
                    </div>
                  ) : (
                    <div className="flex text-nowrap items-center gap-1.5 bg-gray-500/20 border border-gray-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                      OFF AIR
                    </div>
                  )}
                  <span className="text-white/60 text-xs font-medium truncate">
                    FM 101.25 MHz
                  </span>
                </div>
                <h3
                  className={`text-lg font-bold leading-none truncate max-w-[150px] md:max-w-xs drop-shadow-md transition-colors ${
                    isOnline ? "text-white" : "text-gray-400"
                  }`}
                >
                  {isOnline ? name_audio : "สถานีปิดให้บริการ"}
                </h3>
                <p className="text-white/70 text-sm truncate">
                  {isOnline ? description_audio : "เจอกันใหม่พรุ่งนี้"}
                </p>
              </div>
            </div>

            {/* Middle/Right: Volume Controls */}
            <div
              className={`hidden md:flex items-center gap-4 px-4 py-2 rounded-full border transition-all ${
                isOnline
                  ? "bg-black/20 border-white/5"
                  : "bg-black/40 border-gray-700/30 opacity-50"
              }`}
            >
              <button
                onClick={toggleMute}
                disabled={!isOnline}
                className="text-white/80 hover:text-white transition-colors disabled:cursor-not-allowed"
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
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                disabled={!isOnline}
                className={`w-24 h-1.5 rounded-lg appearance-none bg-white/20 ${
                  isOnline ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{
                  background: isOnline
                    ? `linear-gradient(to right, #ef4444 ${
                        (isMuted ? 0 : volume) * 100
                      }%, rgba(255,255,255,0.2) ${
                        (isMuted ? 0 : volume) * 100
                      }%)`
                    : `linear-gradient(to right, #6b7280 ${
                        (isMuted ? 0 : volume) * 100
                      }%, rgba(255,255,255,0.1) ${
                        (isMuted ? 0 : volume) * 100
                      }%)`,
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
